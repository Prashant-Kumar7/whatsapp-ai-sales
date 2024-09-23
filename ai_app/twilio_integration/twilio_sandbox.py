import os

from ai_app.CONSTANTS import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, USER_CONTACT, CLIENT_CONTACT

from twilio.rest import Client

from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv(TWILIO_ACCOUNT_SID)
auth_token = os.getenv(TWILIO_AUTH_TOKEN)
client = Client(account_sid, auth_token)

message = client.messages.create(
  from_=f'whatsapp:{os.getenv(CLIENT_CONTACT)}',
  body='Hi vidhi! you are so cute!',
  to=f'whatsapp:{os.getenv(USER_CONTACT)}'
)

print(message.sid)