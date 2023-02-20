from datetime import datetime
from pydantic import BaseModel, validator
from typing import List
from pydantic_schemas.job_status_schema import JobStatus


class JobRecordBase(BaseModel):
    # jobStatus, portfolio should be included later
    job_title: str
    status: JobStatus
    notes: str


class JobRecordAll(JobRecordBase):
    deadline_date: datetime
    interview_date: datetime
    organization_name: str
    salary: float
    job_url: str
    location: str
    tags_id: List[int]


class JobRecord(JobRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
