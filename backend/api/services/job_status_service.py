from sqlalchemy.orm import Session
from db.models.job_status_model import JobStatus, JobStatusEnum
from db.db_setup import get_db


def populate_initial_data():
    # Get the db session from Generator object (yield)
    db = next(get_db())
    for job_status in JobStatusEnum:
        db.add(JobStatus(job_status))
    db.commit()
    db.close()


def get_all_job_status(db: Session):
    return db.query(JobStatus).all()
