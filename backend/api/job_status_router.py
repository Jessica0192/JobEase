import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import job_status_schema
from api.services import job_status_service

router = fastapi.APIRouter(
    prefix="/job_status",
    tags=["job_status"]
)


@router.get("/", response_model=list[job_status_schema.JobStatus])
async def retrieve_all_jobStatus(db: Session = Depends(get_db)):
    return job_status_service.get_all_job_status(db=db)
