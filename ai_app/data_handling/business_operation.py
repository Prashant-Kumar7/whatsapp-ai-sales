from fastapi import status
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader

from ai_app.database_layer.milvus_db import MilvusDB
from ai_app.llm_layer.chunk_text import chunk_extracted_text
from ai_app.schemas.schema import BusinessURL
from ai_app.service_layer.vector_db_service import add_document_to_db
from ai_app.CONSTANTS import S3_URL, S3_KEY, CLIENT_DATA_COLLECTION as collection_name

import io
from requests import Response
import requests


def fetch_and_extract_client_data(business_url: BusinessURL, vector_db: MilvusDB):
    """
    This method aims to fetch and extract client data, by loading the keys from a set of CONSTANT's
    and using the key's value to fetch the desired client data. Upon successful retrieval, the data
    is then sent for forward processing
    :return: JSON Response regarding operation status
    """

    pre_signed_url = business_url.fileUrl
    file_key = business_url.fileKey

    try:
        response: Response = requests.get(pre_signed_url)
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content="Unable to Fetch Data from Client URL"
        )


    try:
        # Extracting Text from Data Response
        extracted_text = process_client_data(response)

        # Chunking Text and Preparing Data for Insertion
        chunked_text_list = chunk_extracted_text(text=extracted_text)

        # Performing Add Operation
        add_document_to_db(
            collection_name=collection_name,
            document=chunked_text_list,
            metadata=[{"file_key": f"{file_key}"}],
            vector_db=vector_db
        )

    except ValueError as v:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=v
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=True
    )


def process_client_data(response: Response):
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
