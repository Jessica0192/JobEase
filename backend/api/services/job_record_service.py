from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from db.models.job_record_model import JobRecord
from db.models.job_status_model import JobStatus
from db.models.job_tag_model import JobTag
from db.models.portfolio_model import Portfolio
from db.models.job_note_model import JobNote
from db.models.job_note_type_model import JobNoteType
from pydantic_schemas import job_record_schema


def get_job_record_by_id(db: Session, job_record_id: int):
    job_record = db.query(JobRecord).filter(JobRecord.id == job_record_id).first()
    if job_record:
        return job_record_schema.JobRecordAll(id=job_record.id,
                                              job_title=job_record.job_title,
                                              status=job_record.status,
                                              portfolio=job_record.portfolio,
                                              deadline_date=job_record.deadline_date,
                                              interview_date=job_record.interview_date,
                                              organization_name=job_record.organization_name,
                                              salary=job_record.salary,
                                              description=job_record.description,
                                              job_url=job_record.job_url,
                                              location=job_record.location,
                                              tags=job_record.tags,
                                              job_notes=job_record.job_notes)
    else:
        return None


def get_all_job_records_for_user(current_user_id: int, db: Session, limit: int = 100):
    return db.query(JobRecord).filter(JobRecord.user_id == current_user_id).limit(limit).all()


def create_job_record(current_user_id: int, db: Session, job_record: job_record_schema.JobRecordCreateUpdate):
    try:
        print(job_record)
        # Update status
        new_status = db.query(JobStatus).filter_by(status_name=job_record.status.status_name).one()
        # Update portfolio
        portfolio = None
        if job_record.portfolio is not None:
            portfolio = db.query(Portfolio).filter_by(id=job_record.portfolio.id).one()

        # Get user object
        db_job_record = JobRecord(job_title=job_record.job_title,
                                  user_id=current_user_id,
                                  status=new_status,
                                  portfolio=portfolio,
                                  deadline_date=job_record.deadline_date,
                                  interview_date=job_record.interview_date,
                                  organization_name=job_record.organization_name,
                                  salary=job_record.salary,
                                  description=job_record.description,
                                  job_url=job_record.job_url,
                                  location=job_record.location)

        # Append each tag objects to tags property
        for tag in job_record.tags:
            job_tag = db.query(JobTag).filter(JobTag.id == tag.id).first()
            if not job_tag:
                # TODO: how to handle error that Job tag is not found
                print("\nJob tag not found")
                return None
            db_job_record.tags.append(job_tag)

        db.add(db_job_record)
        db.commit()
        db.refresh(db_job_record)

        if job_record.job_notes is not None:
            for note in job_record.job_notes:
                new_note_type = db.query(JobNoteType).filter_by(note_type_name=note.job_note_type.note_type_name).one()
                db_note = JobNote(title=note.title,
                                  note_content=note.note_content,
                                  note_job_record_id=db_job_record.id,
                                  job_note_type_id=new_note_type.id)
                db.add(db_note)
                db.commit()
                db.refresh(db_note)

                db_job_record.job_notes.append(db_note)

        db.add(db_job_record)
        db.commit()
        db.refresh(db_job_record)
        return db_job_record
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new job record with duplicate title\n"
              "Error Args:" + str(error.args))
        return None


def update_job_record(db: Session, job_record_id: int, job_record: job_record_schema.JobRecordCreateUpdate):
    try:
        item = db.query(JobRecord).filter(JobRecord.id == job_record_id).first()
        if item:
            item.job_title = job_record.job_title
            item.deadline_date = job_record.deadline_date
            item.interview_date = job_record.interview_date
            item.organization_name = job_record.organization_name
            item.salary = job_record.salary
            item.description = job_record.description
            item.job_url = job_record.job_url
            item.location = job_record.location

            item.tags = []
            # Insert tags with actual JobTag object
            for tag in job_record.tags:
                job_tag = db.query(JobTag).filter(JobTag.id == tag.id).first()
                if not job_tag:
                    # TODO: how to handle error that Job tag is not found
                    raise print("\nJob tag not found")
                item.tags.append(job_tag)

            # Update status
            new_status = db.query(JobStatus).filter_by(status_name=job_record.status.status_name).one()
            item.status = new_status

            # Update portfolio
            if job_record.portfolio is not None:
                portfolio = db.query(Portfolio).filter_by(id=job_record.portfolio.id).one()
                item.portfolio_id = portfolio.id
                item.portfolio = portfolio

            db.commit()
            db.refresh(item)

            # Clear existing notes to update
            try:
                for note in item.job_notes:
                    db.delete(note)
                db.commit()
            except IntegrityError as error:
                # Handle the exception gracefully and log for being informative
                print("\nError Args:" + str(error.args))

            # Update notes
            if job_record.job_notes is not None:
                for note in job_record.job_notes:
                    new_note_type = db.query(JobNoteType)\
                        .filter_by(note_type_name=note.job_note_type.note_type_name).one()
                    db_note = JobNote(title=note.title,
                                      note_content=note.note_content,
                                      note_job_record_id=job_record_id,
                                      job_note_type_id=new_note_type.id)
                    db.add(db_note)
                    db.commit()
                    db.refresh(db_note)

                    item.job_notes.append(db_note)

            db.commit()
            db.refresh(item)

            return {"message": "JobRecord updated successfully"}
        else:
            return None
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None


def delete_job_record_by_id(db: Session, job_record_id: int):
    existing_job_record = db.query(JobRecord).filter(JobRecord.id == job_record_id)
    if not existing_job_record.first():
        return False
    existing_job_record = existing_job_record.first()
    job_notes = existing_job_record.job_notes

    try:
        for note in job_notes:
            db.delete(note)
        db.delete(existing_job_record)
        db.commit()
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None
