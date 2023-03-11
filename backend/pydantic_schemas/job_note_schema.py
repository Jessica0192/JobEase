from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class JobNoteBase(BaseModel):
    title: Optional[str] = None
    note_content: Optional[str] = None


class JobNoteCreate(JobNoteBase):
    pass


class JobNote(JobNoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
