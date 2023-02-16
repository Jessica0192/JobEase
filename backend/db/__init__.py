# Initialize data
from sqlalchemy import func

from db.db_setup import SessionLocal, engine
from db.models.jobStatus_model import JobStatus
from db.models.jobTag_model import JobTag


def initialize_data():
    # Create a new session
    db = SessionLocal()

    # Check if there's any data in job status table
    job_status_count = db.query(func.count(JobStatus.id)).scalar()
    if job_status_count == 0:
        # Create some JobStatus instances
        job_status_1 = JobStatus(status_name='Interested')
        job_status_2 = JobStatus(status_name='Applied')
        job_status_3 = JobStatus(status_name='Waiting for interview')

        # Add the instances to the session
        db.add(job_status_1)
        db.add(job_status_2)
        db.add(job_status_3)

    # Check if there's any data in job tag table
    job_tag_count = db.query(func.count(JobStatus.id)).scalar()
    if job_tag_count == 0:
        # Create some JobTag instances
        job_tag_1 = JobTag(tag_name='Interested')
        job_tag_2 = JobTag(tag_name='Applied')
        job_tag_3 = JobTag(tag_name='Waiting for interview')

        db.add(job_tag_1)
        db.add(job_tag_2)
        db.add(job_tag_3)

    # Commit the session to persist the data to the database
    db.commit()

    # Close the session
    db.close()
