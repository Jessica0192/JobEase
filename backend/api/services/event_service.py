import os
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.event_model import Event
from pydantic_schemas import event_schema
from db.models.job_record_model import JobRecord
from api.services import google_service, user_service


def get_event_by_google_id(db: Session, google_event_id: str):
    return db.query(Event).filter(Event.google_event_id == google_event_id).first()


def get_event_by_id(db: Session, event_id: int):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        return event_schema.Event(id=db_event.id,
                                  user_id=db_event.user_id,
                                  job_record_id=db_event.job_record_id,
                                  title=db_event.title,
                                  start=db_event.start,
                                  end=db_event.end,
                                  location=db_event.location,
                                  note=db_event.note,
                                  notification=db_event.notification
                                  )
    else:
        return None


def delete_event_by_id(db: Session, event_id: int):
    existing_event = db.query(Event).filter(Event.id == event_id)

    if not existing_event.first():
        return False
    existing_event = existing_event.first()

    # Delete related google event
    if existing_event.google_event_id:
        google_service.delete_google_event(existing_event.user.email, existing_event.google_event_id)

    db.delete(existing_event)
    db.commit()


def get_all_events_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Event).filter(Event.user_id == user_id).limit(limit).all()


def check_by_id_if_event_exists_for_user(db: Session, event_id: int, user_id: int):
    db_event = db.query(Event).filter(Event.id == event_id, Event.user_id == user_id).first()
    if db_event:
        return db_event
    else:
        return None


def check_by_title_if_event_exists_for_user(db: Session, event_title: str, user_id: int):
    db_event = db.query(Event).filter(Event.title == event_title, Event.user_id == user_id).first()
    if db_event:
        return db_event
    else:
        return None


def create_event(db: Session, event: event_schema.Event, user_id: int):
    try:
        db_event = Event(event_user_id=user_id,
                         event_title=event.title,
                         event_start=event.start,
                         event_end=event.end,
                         event_location=event.location,
                         event_note=event.note,
                         event_notification=event.notification,
                         event_job_record_id=event.job_record_id
                         )

        db.add(db_event)
        db.commit()
        db.refresh(db_event)

        # Handle google event creation
        db_user = user_service.get_user_by_id(db=db, user_id=user_id)
        if db_user:
            google_event_id = google_service.create_google_event(username=db_user.email,
                                                                 summary=db_event.title,
                                                                 location=db_event.location,
                                                                 description=db_event.note,
                                                                 start=db_event.start,
                                                                 end=db_event.end)
            if google_event_id is not None:
                db_event.google_event_id = google_event_id
                db.commit()
                db.refresh(db_event)

        return db_event
    except IntegrityError as error:
        print("Error Args:" + str(error.args))
        return None


def update_event(db: Session, event_id: int, event: event_schema.EventCreate):
    if not isinstance(event, event_schema.EventCreate):
        raise TypeError("event must be of type Event")
    try:
        item = db.query(Event).filter(Event.id == event_id).first()
        # item = db.query(Event).get(event_id)
        if item:
            item.title = event.title
            item.start = event.start
            item.end = event.end
            item.location = event.location
            item.note = event.note
            item.notification = event.notification

            if event.job_record_id is not None:
                job_record = db.query(JobRecord).filter_by(id=event.job_record_id).one()
                item.job_record_id = job_record.id

            db.commit()
            db.refresh(item)

            if item.google_event_id:
                # Handle google event update
                google_event_id = google_service.update_google_event(username=item.user.email,
                                                                     event_id=item.google_event_id,
                                                                     summary=item.title,
                                                                     location=item.location,
                                                                     description=item.note,
                                                                     start=item.start,
                                                                     end=item.end)
                if google_event_id is not None:
                    item.google_event_id = google_event_id
                    db.commit()
                    db.refresh(item)

            return {"message": "Event updated successfully"}
        else:
            return None
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None
