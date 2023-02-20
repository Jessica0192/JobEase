from sqlalchemy.orm import Session
from db.models.job_tag_model import JobTag, JobTagEnum
from db.db_setup import get_db


def populate_initial_data():
    # Get the db session from Generator object (yield)
    db = next(get_db())
    for job_tag in JobTagEnum:
        db.add(JobTag(job_tag))
    db.commit()
    db.close()


def get_all_tags(db: Session):
    return db.query(JobTag).all()
