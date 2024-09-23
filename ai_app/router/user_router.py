from fastapi import APIRouter, Depends, Request, Response, status
from fastapi.responses import JSONResponse
from twilio.twiml.messaging_response import MessagingResponse

from ai_app.data_handling.user_operation import generate_query_response
from ai_app.database_layer.milvus_db import MilvusDB
from ai_app.llm_layer.llm_client import ClaudeLLM
from ai_app.utilities.startup import startup_utilities

router  = APIRouter(
    prefix='/user'
)

@router.post('/get-query-response', tags=['user'])
async def get_query_response(request: Request,
                       vector_db: MilvusDB = Depends(startup_utilities.get_vector_database_client),
                       llm_client: ClaudeLLM = Depends(startup_utilities.get_llm_client)):
    try:

        form = await request.form()
        user_query = form.get('Body')

        print(f"Printing User Text: \n{user_query}")

    except Exception as e:
        print(f"Unable to extract user message from request\n.Error Stack Trace:\n{e}")
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content="Unable to extract user message from request"
        )
    try:

        llm_response = generate_query_response(user_query = user_query, vector_db=vector_db, llm_client=llm_client)

        response = MessagingResponse()
        response.message(llm_response)
        return Response(
            content=str(response),
            media_type='application/xml'
        )

    except ValueError as v:
        print(f"Error Occurred while generating response.\nErrpr Stack Trace\n{v}")
        return JSONResponse(
            status_code=status.HTTP_417_EXPECTATION_FAILED,
            content="Error Occurred while generating response"
        )

