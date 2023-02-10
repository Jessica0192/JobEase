import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import jobRecord_schema
from api.services import jobRecord_service

router = fastapi.APIRouter(
    prefix="/jobRecord",
    tags=["jobRecords"]
)


@router.get("/{jobRecord_id}", response_model=jobRecord_schema.JobRecord)
async def retrieve_jobRecord_by_id(jobRecord_id: int, db: Session = Depends(get_db)):
    db_jobRecord = jobRecord_service.get_jobRecord_by_id(db=db, jobRecord_id=jobRecord_id)
    if db_jobRecord is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job Record not found")
    return db_jobRecord


@router.get("/", response_model=list[jobRecord_schema.JobRecord])
async def retrieve_all_jobRecords(limit: int = 100, db: Session = Depends(get_db)):
    return jobRecord_service.get_all_jobRecords(db=db, limit=limit)


@router.post("/", response_model=jobRecord_schema.JobRecord)
async def create_new_jobRecord(jobRecord: jobRecord_schema.JobRecordCreate, db: Session = Depends(get_db)):
    db_jobRecord = jobRecord_service.create_jobRecord(db=db, jobRecord=jobRecord)
    if db_jobRecord is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Job Record with the same title already exists")
    return db_jobRecord


# need update job record endpoint
