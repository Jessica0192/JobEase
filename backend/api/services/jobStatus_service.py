from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.jobStatus_model import JobStatus
from pydantic_schemas import user_schema
from core.hashing import Hasher


def get_all_job_status(db: Session, limit: int = 100):
    return db.query(JobStatus).limit(limit).all()
