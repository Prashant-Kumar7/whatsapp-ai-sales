from fastapi import status
from fastapi.responses import JSONResponse

from ai_app.CONSTANTS import CLIENT_DATA_COLLECTION as collection_name
from ai_app.database_layer.milvus_db import MilvusDB
from ai_app.llm_layer.llm_client import ClaudeLLM
from ai_app.service_layer.vector_db_service import query_document


def generate_query_response(user_query: str, vector_db: MilvusDB, llm_client: ClaudeLLM):

    if user_query == "":
        return JSONResponse(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            content="Query Can Not Be Empty"
        )

    try:
        query_results = query_document(
            collection_name=collection_name,
            user_query=user_query,
            vector_db=vector_db
        )

        formatted_query_results = parse_query_results(query_results=query_results[0])
        llm_response = llm_client.generate_response(
            user_query=user_query,
            query_results=formatted_query_results
        )

        # For general conversation with LLM, not restricted by any topic
        # llm_response = llm_client.generate_conversational_response(user_query=user_query)

        return llm_response

    except ValueError as v:
        raise ValueError(v)

def parse_query_results(query_results: list[dict]):

    formatted_query_results = []

    for result_dict in query_results:

        if 'distance' in result_dict and 'text' in result_dict.get('entity', {}):
            current_dict = {
                'distance': result_dict['distance'],
                'text': result_dict.get('entity')['text']
            }
            formatted_query_results.append(current_dict)

    return formatted_query_results




