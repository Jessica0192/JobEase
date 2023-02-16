import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import jobStatus_schema
from api.services import jobStatus_service

router = fastapi.APIRouter(
    prefix="/job_status",
    tags=["job_status"]
)


@router.get("/", response_model=list[jobStatus_schema.JobStatus])
async def retrieve_all_jobStatus(limit: int = 100, db: Session = Depends(get_db)):
    return jobStatus_service.get_all_job_status(db=db, limit=limit)
