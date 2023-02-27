from pydantic import BaseModel
from db.models.job_tag_model import JobTagEnum


class JobTag(BaseModel):
    id: int
    tag_name: JobTagEnum

    class Config:
        orm_mode = True
