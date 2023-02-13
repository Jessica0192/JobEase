from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.jobRecord_model import JobRecord
from db.models.jobTag_model import JobTag
from pydantic_schemas import jobRecord_schema
from core.hashing import Hasher


def get_jobRecord_by_id(db: Session, jobRecord_id: int):
    job_record = db.query(JobRecord).filter(JobRecord.id == jobRecord_id).first()
    if job_record:
        tags = [tag.id for tag in job_record.tags]
        return {
            'id': job_record.id,
            'job_title': job_record.job_title,
            'deadline_date': job_record.deadline_date,
            'interview_date': job_record.interview_date,
            'organization_name': job_record.organization_name,
            'salary': job_record.salary,
            'notes': job_record.notes,
            'job_url': job_record.job_url,
            'location': job_record.location,
            'tags': tags,
            'created_at': job_record.created_at,
            'updated_at': job_record.updated_at
        }
    else:
        return None


def get_all_jobRecords(db: Session, limit: int = 100):
    job_records = db.query(JobRecord).limit(limit).all()
    result = []
    for job_record in job_records:
        tags = [tag.id for tag in job_record.tags]
        result.append({
            'id': job_record.id,
            'job_title': job_record.job_title,
            'deadline_date': job_record.deadline_date,
            'interview_date': job_record.interview_date,
            'organization_name': job_record.organization_name,
            'salary': job_record.salary,
            'notes': job_record.notes,
            'job_url': job_record.job_url,
            'location': job_record.location,
            'tags': tags,
            'created_at': job_record.created_at,
            'updated_at': job_record.updated_at
        })
    return result

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

        # Insert tags with actual JobTag object
        for tag_id in jobRecord.tags:
            job_tag = db.query(JobTag).filter(JobTag.id == tag_id).first()
            if not job_tag:
                # TODO: how to handle error that Job tag is not found
                print("\nJob tag not found")
                return None
            db_jobRecord.tags.append(job_tag)

        db.add(db_jobRecord)
        db.commit()
        db.refresh(db_jobRecord)
        return db_jobRecord
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new job record with duplicate title\n"
              "Error Args:" + str(error.args))
        return None


def update_jobRecord(db: Session, jobRecord_id: int, jobRecord: jobRecord_schema.JobRecordUpdate):
    try:
        item = db.query(JobRecord).filter(JobRecord.id == jobRecord_id).first()
        if item:
            item.job_title = jobRecord.job_title
            item.deadline_date = jobRecord.deadline_date
            item.interview_date = jobRecord.interview_date
            item.organization_name = jobRecord.organization_name
            item.salary = jobRecord.salary
            item.notes = jobRecord.notes
            item.job_url = jobRecord.job_url
            item.location = jobRecord.location

            item.tags = []
            # Insert tags with actual JobTag object
            for tag_id in jobRecord.tags:
                job_tag = db.query(JobTag).filter(JobTag.id == tag_id).first()
                if not job_tag:
                    # TODO: how to handle error that Job tag is not found
                    raise print("\nJob tag not found")
                    return None
                item.tags.append(job_tag)

            db.commit()
            db.refresh(item)
            return {"message": "JobRecord updated successfully"}
        else:
            return None
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None
