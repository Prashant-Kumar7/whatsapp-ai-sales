from CONSTANTS import S3_URL, S3_KEY, CLIENT_DATA_COLLECTION as collection_name
from fastapi import status
from fastapi.responses import JSONResponse

from database_layer.milvus_db import MilvusDB
from llm_layer.chunk_text import chunk_extracted_text
from PyPDF2 import PdfReader
from service_layer.vector_db_service import add_document_to_db

import io
import os
import requests


def fetch_and_extract_client_data(vector_db: MilvusDB):
    """
    This method aims to fetch and extract client data, by loading the keys from a set of CONSTANT's
    and using the key's value to fetch the desired client data. Upon successful retrieval, the data
    is then sent for forward processing
    :return: JSON Response regarding operation status
    """

    if S3_URL in os.environ and S3_KEY:
        s3_url = os.getenv(S3_URL)
        file_name = os.getenv(S3_KEY)
    else:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content="Client URL not found!"
        )

    try:
        response = requests.get(s3_url)
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content="Unable to Fetch Data from Client URL"
        )

    # Extracting Text from Data Response
    extracted_text = process_client_data(response)

    try:

        # Chunking Text and Preparing Data for Insertion
        chunked_text_list = chunk_extracted_text(text=extracted_text)

        # Performing Add Operation
        add_document_to_db(
            collection_name=collection_name,
            document=chunked_text_list,
            metadata=[{"filename": f"{file_name}"}],
            vector_db=vector_db
        )

    except ValueError as v:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=v
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content="Client Data Fetched and Added to Vector Database"
    )


def process_client_data(response):
    try:
        pdf_file = io.BytesIO(response.content)
    except Exception as e:
        print(f"Failed to read Client Data,\nError Stack Trace : {str(e)}")
        raise ValueError(f"Failed to read Client Data,")
    try:
        # Extracting text from PDF, relative path might differ in various IDE's
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()

    except Exception as e:
        print(f"Error Occurred While Performing Operation on Client Data,\nError stack Trace: {str(e)}")
        raise ValueError(f"Error Occurred While Performing Operation on Client Data,")

    return text
