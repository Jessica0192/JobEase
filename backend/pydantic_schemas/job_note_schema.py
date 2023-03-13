from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from pydantic_schemas.job_note_type_schema import JobNoteType


class JobNoteBase(BaseModel):
    title: Optional[str] = None
    note_content: Optional[str] = None
    job_note_type: JobNoteType


class JobNoteCreate(JobNoteBase):
    pass


class JobNote(JobNoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
