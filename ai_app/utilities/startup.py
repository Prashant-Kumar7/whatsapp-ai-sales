import json
import threading
import os
from dotenv import load_dotenv

from ai_app.database_layer.milvus_db import MilvusDB
from ai_app.llm_layer.llm_client import ClaudeLLM


class SetUpUtilities(object):
    
    def __init__(self) -> None:
        load_dotenv()
        project_home = os.getenv("project_home")
        config_path = os.path.join(project_home, "dev_config", "config.json")

        with open(config_path) as handle:
            self.config_dict = json.loads(handle.read())

    def setup_vector_database_client(self):
        vector_db_object = MilvusDB(db_name=self.config_dict.get("db_name"))
        return vector_db_object

    def setup_llm_client(self):
        llm_client_object = ClaudeLLM()
        return llm_client_object

class StartUp(object):

    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if not cls._instance:
                   cls._instance = super().__new__(cls)
                   cls._instance._init_connections()

        return cls._instance

    
    def _init_connections(self):
        self.setup_utilities = SetUpUtilities()
        self.vector_db_client = self.setup_utilities.setup_vector_database_client()
        self.llm_client = self.setup_utilities.setup_llm_client()
    
    def get_vector_database_client(self):
        return self.vector_db_client

    def get_llm_client(self):
        return self.llm_client

startup_utilities = StartUp()




    