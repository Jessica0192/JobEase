import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.job_record_model import JobRecord
from db.models.user_model import User
from pydantic_schemas import job_record_schema
from api.services import job_record_service, auth_service

router = fastapi.APIRouter(
    prefix="/job_record",
    tags=["job records"]
)


@router.get("/{job_record_id}", response_model=job_record_schema.JobRecordAll)
async def retrieve_job_record_by_id(job_record_id: int,
                                    db: Session = Depends(get_db),
                                    current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_job_record = job_record_service.get_job_record_by_id(db=db, job_record_id=job_record_id)

    if db_job_record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job Record not found")

    job_record_user_id = db.query(JobRecord).filter(JobRecord.id == job_record_id).first().user_id

    # check if current user is permitted to get job record by id
    if job_record_user_id != current_user.id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    return db_job_record


@router.get("/", response_model=list[job_record_schema.JobRecord])
async def retrieve_all_job_records_for_user(limit: int = 100,
                                            db: Session = Depends(get_db),
                                            current_user: User = Depends(auth_service.get_current_user_from_token)):
    return job_record_service.get_all_job_records_for_user(current_user_id=current_user.id, db=db, limit=limit)


@router.post("/")
async def create_new_job_record(job_record: job_record_schema.JobRecordAll,
                                db: Session = Depends(get_db),
                                current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_job_record = job_record_service.create_job_record(current_user_id=current_user.id, db=db, job_record=job_record)
    if db_job_record is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Job Record with the same title already exists")
    return db_job_record


# need update job record endpoint
@router.put("/{job_record_id}")
async def update_job_record(job_record_id: int,
                            job_record: job_record_schema.JobRecordAll,
                            db: Session = Depends(get_db),
                            current_user: User = Depends(auth_service.get_current_user_from_token)):
    job_record_user_id = db.query(JobRecord).filter(JobRecord.id == job_record_id).first().user_id

    if job_record_user_id != current_user.id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    db_job_record = job_record_service.update_job_record(db=db, job_record_id=job_record_id, job_record=job_record)

    if db_job_record is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Job Record with the same title already exists")
