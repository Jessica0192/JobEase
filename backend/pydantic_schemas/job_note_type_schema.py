from pydantic import BaseModel
from db.models.job_note_type_model import JobNoteTypeEnum


class JobNoteType(BaseModel):
    id: int
    note_type_name: JobNoteTypeEnum

    class Config:
        orm_mode = True
