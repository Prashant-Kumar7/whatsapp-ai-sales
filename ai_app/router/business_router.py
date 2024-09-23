from database_layer.milvus_db import MilvusDB
from fastapi import APIRouter, Depends
from data_handling.business_operation import fetch_and_extract_client_data
from utilities.startup import startup_utilities
router = APIRouter(
    prefix='/client'
)

@router.get('/fetch-data', tags=['business'])
def fetch_client_data(vector_db: MilvusDB = Depends(startup_utilities.get_vector_database_client)):
    return fetch_and_extract_client_data(vector_db)