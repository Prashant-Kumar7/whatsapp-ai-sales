import os

from pymilvus import MilvusClient, FieldSchema, DataType, CollectionSchema
from pymilvus import model
from typing import Optional


class MilvusDB:

    def __init__(self, db_name: str) -> None:
        self.client = MilvusClient(
            uri=os.getenv("zilliz_milvus_uri"),
            token=os.getenv("zilliz_milvus_token"),
            db_name=db_name
        )
        self.embedding_fn = model.DefaultEmbeddingFunction()

    def create_collection(self, collection_name: str):
        """
        This method aims to create a collection, given it does not pre-exist
        """

        if not self.client.has_collection(collection_name=collection_name):

            fields = [
                FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
                FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),
                FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=768)
            ]

            schema = CollectionSchema(
                fields=fields,
                description="Client Chunks Collection",
                enable_dynamic_field=True
            )

            index_params = self.client.prepare_index_params()
            index_params.add_index(
                field_name="vector",
                metric_type="L2",
                index_type="IVF_FLAT",
                params={"nlist": 1024}
            )

            self.client.create_collection(
                collection_name=collection_name,
                schema=schema,
                index_params=index_params
            )

    
    def add_to_db(self, collection_name: str, document: list[str], metadata: Optional[list[dict]] = None):
        """
        This method aims to add documents, vectors and any metadata attached to the Milvus database.
        :param collection_name: Name of the configured collection
        :param document: List of documents to be added
        :param metadata: Optional list of metadata to be added for increased search semantics
        :return: The result of the operation
        """
        try:
            # Pre-check to ensure collection exists before attempting operation
            self.create_collection(collection_name=collection_name)

            # Using Milvus' given model to embed document vectors
            vectors = self.embedding_fn.encode_documents(document)

            # Preparing a base-data configuration independent of metadata capable of insertion
            data = [
                {
                    "vector": v,
                    "text": t
                }
                for v, t in zip(vectors, document)
            ]

            # Attaching metadata to base-data if present
            if metadata is not None and len(metadata) == len(document):
                for data_dict_item, meta in zip(data, metadata):
                    data_dict_item.update(meta)


            elif metadata is not None and len(metadata) == 1:
                metadata_dict = metadata[0]
                key, value = next(iter(metadata_dict.items()))
                for data_dict_item in data:
                    data_dict_item[key] = value

            # Performing final operation post data preparation
            add_result = self.client.insert(
                collection_name=collection_name,
                data=data
            )

            return add_result

        except Exception as e:
            print(f"Error Cccurred during Add Operation.\nError Stack Trace:\n{e}")
            raise ValueError("Error Occurred during Add Operation.")
    
    def drop_collection(self, collection_name:str):
        if self.client.has_collection(collection_name=collection_name):
            self.client.drop_collection(collection_name=collection_name)

    def query_db(self, collection_name: str, query: str):
        """
        Method documentation to query
        """
        if not self.collection_exists(collection_name=collection_name):
            raise ValueError("Collection does not exist!")

        try:
            query_vectors = self.embedding_fn.encode_queries([query])

            search_result = self.client.search(
                collection_name=collection_name,
                data=query_vectors,
                limit=5,
                output_fields=["text"]
            )

            return search_result
        except Exception as e:
            print(f"Error occurred during query operation.\nError Stack Trace: \n{e}")
            raise ValueError(f"Error occurred during query operation.")

    def collection_exists(self, collection_name: str):
        return self.client.has_collection(collection_name=collection_name)