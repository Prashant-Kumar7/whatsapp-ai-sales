import os

from anthropic import Anthropic
from llm_layer.llm_prompts import generate_distance_aware_prompt

from CONSTANTS import ANTHROPIC_API_KEY

class ClaudeLLM:

    def __init__(self):
        self.client = Anthropic(
            api_key=os.getenv(ANTHROPIC_API_KEY)
        )

    def generate_response(self, user_query: str, query_results:list[dict]):

        prompt = generate_distance_aware_prompt(
            user_query=user_query,
            query_results=query_results
        )

        response = self.client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=300,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        llm_response = response.content[0].text

        return llm_response



