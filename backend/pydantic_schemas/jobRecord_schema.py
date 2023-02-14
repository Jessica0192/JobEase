from datetime import datetime
from pydantic import BaseModel, validator
from typing import List


class JobRecordBase(BaseModel):
    # jobStatus should be included later
    job_title: str
    deadline_date: datetime
    interview_date: datetime
    organization_name: str
    salary: float
    notes: str
    job_url: str
    location: str
    tags: List[int]


class JobRecordCreate(JobRecordBase):
    # tags, portfolio should be included later
    pass


class JobRecordUpdate(JobRecordBase):
    # tags, portfolio should be included later
    pass


class JobRecord(JobRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
