import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import job_note_type_schema
from api.services import job_note_type_service

router = fastapi.APIRouter(
    prefix="/job_note_type",
    tags=["job note type"]
)


@router.get("/", response_model=list[job_note_type_schema.JobNoteType])
async def retrieve_all_jobNoteType(db: Session = Depends(get_db)):
    return job_note_type_service.get_all_job_status(db=db)
