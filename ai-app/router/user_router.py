from fastapi import APIRouter, Depends
from schemas.schema import Query
from data_handling.user_operation import generate_query_response

from database_layer.milvus_db import MilvusDB
from llm_layer.llm_client import ClaudeLLM
from utilities.startup import startup_utilities

router  = APIRouter(
    prefix='/user'
)

@router.post('/get-query-response', tags=['user'])
def get_query_response(user_query: Query,
                       vector_db: MilvusDB = Depends(startup_utilities.get_vector_database_client),
                       llm_client: ClaudeLLM = Depends(startup_utilities.get_llm_client)):
    return generate_query_response(user_query = user_query.query, vector_db=vector_db, llm_client=llm_client)
