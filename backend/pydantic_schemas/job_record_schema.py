from datetime import datetime
from pydantic import BaseModel, validator
from typing import List, Optional
from pydantic_schemas.job_status_schema import JobStatus
from pydantic_schemas.job_tag_schema import JobTag
from pydantic_schemas.portfolio_schema import Portfolio


class JobRecordBase(BaseModel):
    # jobStatus, portfolio should be included later
    job_title: str
    status: JobStatus
    notes: str


class JobRecordAll(JobRecordBase):
    deadline_date: Optional[datetime] = None
    interview_date: Optional[datetime] = None
    organization_name: str
    salary: float
    job_url: str
    location: str
    tags: List[JobTag]
    portfolio: Optional[Portfolio] = None


class JobRecord(JobRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
