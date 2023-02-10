from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.jobRecord_model import JobRecord
from pydantic_schemas import jobRecord_schema
from core.hashing import Hasher


def get_jobRecord_by_id(db: Session, jobRecord_id: int):
    return db.query(JobRecord).filter(JobRecord.id == jobRecord_id).first()


def get_all_jobRecords(db: Session, limit: int = 100):
    return db.query(JobRecord).limit(limit).all()


def create_jobRecord(db: Session, jobRecord: jobRecord_schema.JobRecordCreate):
    try:
        db_jobRecord = JobRecord(job_title=jobRecord.job_title,
                                 deadline_date=jobRecord.deadline_date,
                                 interview_date=jobRecord.interview_date,
                                 organization_name=jobRecord.organization_name,
                                 salary=jobRecord.salary,
                                 notes=jobRecord.notes,
                                 job_url=jobRecord.job_url,
                                 location=jobRecord.location)
        db.add(db_jobRecord)
        db.commit()
        db.refresh(db_jobRecord)
        return db_jobRecord
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new user with duplicate username or email\n"
              "Error Args:" + str(error.args))
        return None
