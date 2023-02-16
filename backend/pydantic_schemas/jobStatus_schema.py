from pydantic import BaseModel


class JobStatusBase(BaseModel):
    status_name: str


class JobStatus(JobStatusBase):
    id: int

    class Config:
        orm_mode = True
