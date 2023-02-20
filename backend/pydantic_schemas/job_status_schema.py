from pydantic import BaseModel
from db.models.job_status_model import JobStatusEnum

class JobStatus(BaseModel):
    id: int
    status: JobStatusEnum

    class Config:
        orm_mode = True
