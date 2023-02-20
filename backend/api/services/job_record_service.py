from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from db.models.job_record_model import JobRecord
from db.models.job_status_model import JobStatus
from db.models.job_tag_model import JobTag
from db.models.user_model import User
from pydantic_schemas import job_record_schema
from core.hashing import Hasher


def get_jobRecord_by_id(db: Session, job_record_id: int):
    job_record = db.query(JobRecord).filter(JobRecord.id == job_record_id).first()
    if job_record:
        tag_ids = [tag.id for tag in job_record.tags]
        return job_record_schema.JobRecordAll(id=job_record.id,
                                             job_title=job_record.job_title,
                                             status=job_record.status.status_name,
                                             deadline_date=job_record.deadline_date,
                                             interview_date=job_record.interview_date,
                                             organization_name=job_record.organization_name,
                                             salary=job_record.salary,
                                             notes=job_record.notes,
                                             job_url=job_record.job_url,
                                             location=job_record.location,
                                             tags_id=tag_ids
                                             )
    else:
        return None


def get_all_jobRecords(current_user_id: int, db: Session, limit: int = 100):
    job_records = db.query(JobRecord).filter(JobRecord.user_id == current_user_id).limit(limit).all()
    result = []
    for job_record in job_records:
        tags = [tag.id for tag in job_record.tags]
        result.append(job_record_schema.JobRecord(id=job_record.id,
                                                 job_title=job_record.job_title,
                                                 status=job_record.status.status_name,
                                                 notes=job_record.notes,
                                                 created_at=job_record.created_at,
                                                 updated_at=job_record.updated_at
                                                 ))
    return result


def create_jobRecord(current_user_id: int, db: Session, job_record: job_record_schema.JobRecordAll):
    try:
        # Update status
        new_status = db.query(JobStatus).filter_by(status_name=job_record.status).one()

        # Get user object
        db_job_record = JobRecord(job_title=job_record.job_title,
                                  user_id=current_user_id,
                                  status=new_status,
                                  deadline_date=job_record.deadline_date,
                                  interview_date=job_record.interview_date,
                                  organization_name=job_record.organization_name,
                                  salary=job_record.salary,
                                  notes=job_record.notes,
                                  job_url=job_record.job_url,
                                  location=job_record.location)

        # Insert tags with actual JobTag object
        for tag_id in job_record.tags_id:
            job_tag = db.query(JobTag).filter(JobTag.id == tag_id).first()
            if not job_tag:
                # TODO: how to handle error that Job tag is not found
                print("\nJob tag not found")
                return None
            db_job_record.tags.append(job_tag)

        db.add(db_job_record)
        db.commit()
        db.refresh(db_job_record)
        return db_job_record
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new job record with duplicate title\n"
              "Error Args:" + str(error.args))
        return None


def update_jobRecord(db: Session, job_record_id: int, job_record: job_record_schema.JobRecordAll):
    try:
        item = db.query(JobRecord).filter(JobRecord.id == job_record_id).first()
        if item:
            item.job_title = job_record.job_title
            item.deadline_date = job_record.deadline_date
            item.interview_date = job_record.interview_date
            item.organization_name = job_record.organization_name
            item.salary = job_record.salary
            item.notes = job_record.notes
            item.job_url = job_record.job_url
            item.location = job_record.location

            item.tags = []
            # Insert tags with actual JobTag object
            for tag_id in job_record.tags_id:
                job_tag = db.query(JobTag).filter(JobTag.id == tag_id).first()
                if not job_tag:
                    # TODO: how to handle error that Job tag is not found
                    raise print("\nJob tag not found")
                item.tags.append(job_tag)

            # Update status
            new_status = db.query(JobStatus).filter_by(status_name=job_record.status).one()
            item.status = new_status

            db.commit()
            db.refresh(item)
            return {"message": "JobRecord updated successfully"}
        else:
            return None
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None
