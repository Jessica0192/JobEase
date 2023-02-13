from datetime import datetime
from pydantic import BaseModel, validator
from typing import List


class JobRecordBase(BaseModel):
    # jobStatus should be included later
    job_title: str


class JobRecordCreate(JobRecordBase):
    # tags, portfolio should be included later
    deadline_date: datetime
    interview_date: datetime
    organization_name: str
    salary: float
    notes: str
    job_url: str
    location: str
    tags: List[int]


class JobRecordUpdate(JobRecordBase):
    # tags, portfolio should be included later
    deadline_date: datetime
    interview_date: datetime
    organization_name: str
    salary: float
    notes: str
    job_url: str
    location: str
    tags: List[int]


class JobRecord(JobRecordBase):
    id: int
    deadline_date: datetime
    interview_date: datetime
    organization_name: str
    salary: float
    notes: str
    job_url: str
    location: str
    tags: List[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
