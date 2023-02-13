import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import jobRecord_schema
from api.services import jobRecord_service

router = fastapi.APIRouter(
    prefix="/job_record",
    tags=["job_records"]
)


@router.get("/{job_record_id}", response_model=jobRecord_schema.JobRecord)
async def retrieve_jobRecord_by_id(job_record_id: int, db: Session = Depends(get_db)):
    # TODO: Need to reject when user tries to retrieve Job Record that is not for current user
    db_jobRecord = jobRecord_service.get_jobRecord_by_id(db=db, jobRecord_id=job_record_id)
    if db_jobRecord is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job Record not found")
    return db_jobRecord


@router.get("/", response_model=list[jobRecord_schema.JobRecord])
async def retrieve_all_jobRecords(limit: int = 100, db: Session = Depends(get_db)):
    # TODO: Need to implement getting jobRecords for the current user
    return jobRecord_service.get_all_jobRecords(db=db, limit=limit)


@router.post("/")
async def create_new_jobRecord(jobRecord: jobRecord_schema.JobRecordCreate, db: Session = Depends(get_db)):
    db_jobRecord = jobRecord_service.create_jobRecord(db=db, jobRecord=jobRecord)
    if db_jobRecord is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Job Record with the same title already exists")
    return db_jobRecord


# need update job record endpoint
@router.put("/{job_record_id}")
async def update_jobRecord(job_record_id: int, jobRecord: jobRecord_schema.JobRecordUpdate, db: Session = Depends(get_db)):
    db_jobRecord = jobRecord_service.update_jobRecord(db=db, jobRecord_id=job_record_id, jobRecord=jobRecord)
    if db_jobRecord is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Job Record with the same title already exists")
