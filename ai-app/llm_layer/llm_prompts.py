import numpy as np

def check_query_is_valid(user_query: str):
    pass

def create_response_prompt(user_query: str, vector_db_query_response: list):
    template = f"""
    You are an assistant named 'Keshav', created to respond to questions using only the provided information. 
    Your task is to analyze the given search results and craft an appropriate response.

    Question: {user_query}
    
    Search Results: {vector_db_query_response}
    
    Instructions:
    - Carefully review the search results and the question.
    - Formulate a response based strictly on the search results without any external information or assumptions.
    - If the results provide multiple pieces of data, summarize them concisely where appropriate 
    - If the information is incomplete or unclear, ask for additional details to continue resolving the query 
    - Deduce or infer information only from the provided context, without making external assumptions 
    - If the data can be presented in a different format, like restructuring a list into a paragraph, transform it accordingly 
    - Expand your response with additional explanations if the provided information is lacking or ambiguous 
    - If there are contradictions in the results, point them out and explain how you're addressing them.
    - Use formal language, and if you're unsure about any part of your answer, express the uncertainty.

    Response:
    """
    return template

def generate_distance_aware_prompt(user_query: str, query_results: list[dict]):
    query_results, relevance_scores = create_distance_aware_results(query_results=query_results)

    template = f"""
    You are a friendly and helpful assistant named 'Jarvis', tasked with answering questions based solely on the provided data. 
    Your role is to analyze the search results and relevance scores to answer the question below.

    Question: {user_query}
    
    """
    template = modify_prompt(
        template=template,
        query_results=query_results,
        relevance_scores=relevance_scores
    )

    template += """
    Instructions:
    - Firstly, introduce yourself shortly like "Hi! I am Jarvis, and I am happy to assist you", then address the query
    - If you don't find relevant information, apologize to the user and politely ask the user to ask relevant questions only. Do not engage your own aswer for such questions
    - Review the provided information, giving more weight to results with higher relevance scores.
    - Formulate a comprehensive answer to the question using this information, ensuring clarity and consistency.
    - Summarize where necessary and ask for more details if you don’t have enough information.
    - Make logical inferences based on the provided context, but do not introduce external information
    - If there are contradictions in the results, address them and explain how you resolve these inconsistencies.
    - Use formal language and indicate any uncertainties if you're unsure. Do not attempt to answer yourself.
    - Do not mention to the user anything about Relevance Score or Search Results provided to you
    - When responding, instead of using 'search results', use 'based on my information'
    - Remember that your answer is being sent to the user, so do not use terms like 'User', 'based on the information provided' or 'according to search results' etc.
    - Do not start you response with 'Based on the information provided'. Use personal pronouns like 'I' instead.
    - Respond as if you yourself are talking.

    Response:
    """
    return template



def create_distance_aware_results(query_results: list[dict]):

    # Sort results by distance (ascending)
    query_results.sort(key=lambda x: x['distance'])

    # Keep only the top max_results, hardcoded will do dynamic later
    if len(query_results) >= 3:
        formatted_query_results = query_results[:3]

    # Calculate relevance scores
    distances = np.array([r['distance'] for r in query_results])
    max_distance = np.max(distances)
    relevance_scores = 1 - (distances / max_distance)

    return query_results, relevance_scores

def modify_prompt(template: str, query_results: list[dict], relevance_scores):

    for i, (result, relevance) in enumerate(zip(query_results, relevance_scores), 1):
        template += f"\n{i}. Relevance Score: {relevance:.2f}\n"
        template += f"   Content: {result['text']}\n"
        # if result['metadata']:
        #     template += f"   Additional Info: {result['metadata']}\n"

    return template