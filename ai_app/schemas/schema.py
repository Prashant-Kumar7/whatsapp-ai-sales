from pydantic import BaseModel

class BusinessURL(BaseModel):
    fileUrl: str
    fileKey: str