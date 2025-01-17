from ai_app.database_layer.milvus_db import MilvusDB
from fastapi import APIRouter, Depends

from ai_app.data_handling.business_operation import fetch_and_extract_client_data
from ai_app.schemas.schema import BusinessURL
from ai_app.utilities.startup import startup_utilities

import requests

router = APIRouter(
    prefix='/client',
    tags=['business']
)

@router.post('/fetch-data')
def fetch_client_data(business_url: BusinessURL,
                      vector_db: MilvusDB = Depends(startup_utilities.get_vector_database_client)):
    return fetch_and_extract_client_data(business_url, vector_db)