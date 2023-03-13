from sqlalchemy.orm import Session
from db.models.job_note_type_model import JobNoteType, JobNoteTypeEnum
from db.db_setup import get_db


def populate_initial_data():
    # Get the db session from Generator object (yield)
    db = next(get_db())
    for note_type in JobNoteTypeEnum:
        db.add(JobNoteType(note_type))
    db.commit()
    db.close()


def get_all_job_status(db: Session):
    return db.query(JobNoteType).all()
