from typing import Optional, List
from ai_app.database_layer.milvus_db import MilvusDB

def add_document_to_db(collection_name:str, document: list[str], metadata : Optional[list[dict]],
                       vector_db: MilvusDB):

    try:
        add_result: dict = vector_db.add_to_db(
            collection_name=collection_name,
            document=document,
            metadata=metadata
        )
    except ValueError as v:
        raise ValueError(v)

    try:
        if add_result.get('insert-count') == len(document):
            print("Add Operation Successful")
    except Exception as e:
        print(f"Add Operation Successful, however Unexpected Error occurred "
              f"during verification.\nError Stack Trace\n{e}")
        raise ValueError("Add Operation Successful, however Unexpected Error occurred during verification.")

def query_document(collection_name: str, user_query:str,
                   vector_db: MilvusDB):


    query_result: List[List[dict]] = vector_db.query_db(
        collection_name=collection_name,
        query=user_query
    )

    return query_result
