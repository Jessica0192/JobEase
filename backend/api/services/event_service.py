import os
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.event_model import Event
from pydantic_schemas import event_schema
    

def get_event_by_id(db: Session, event_id: int):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        return event_schema.Event(id=db_event.id,
                                  event_user_id=db_event.event_user_id,
                                  event_title=db_event.event_title,
                                  event_start=db_event.event_start_date,
                                  event_end=db_event.event_end_date,
                                  event_location=db_event.event_location,
                                  event_note=db_event.event_note,
                                  event_notification=db_event.event_notification
                                  )
    else:
        return None


def delete_event_by_id(db: Session, event_id: int):
    existing_event = db.query(Event).filter(Event.id == event_id)
    
    if not existing_event.first():
        return False
    existing_event.delete()
    db.commit()


def get_all_events_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Event).filter(Event.event_user_id == user_id).limit(limit).all()


def check_by_id_if_event_exists_for_user(db: Session, event_id: int, user_id: int):
    db_event = db.query(Event).filter(Event.id == event_id, Event.event_user_id == user_id).first()
    if db_event:
        return db_event
    else:
        return None


def check_by_title_if_event_exists_for_user(db: Session, event_title: str, user_id: int):
    db_event = db.query(Event).filter(Event.event_title == event_title, Event.event_user_id == user_id).first()
    if db_event:
        return db_event
    else:
        return None


def create_event(db: Session, event: event_schema.Event, event_user_id: int):
    try:
        existing_event = check_by_title_if_event_exists_for_user(db=db, event_title=event.event_title, user_id=event_user_id)
        if existing_event is not None:
            return None
        db_event = Event(event_user_id=event_user_id,
                         event_title=event.event_title,
                         event_start_date=event.event_start_date,
                         event_end_date=event.event_end_date,
                         event_location=event.event_location,
                         event_note=event.event_note,
                         event_notification=event.event_notification,                       
                         )
        

        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return db_event
    except IntegrityError as error:
        print("Error Args:" + str(error.args))
        return None

def update_event(db: Session, event_id: int, event: event_schema.Event):
    if not isinstance(event, event_schema.Event):
        raise TypeError("event must be of type Event")
    try:
        item = db.query(Event).filter(Event.id == event_id).first()
        # item = db.query(Event).get(event_id)
        if item:
            item.event_user_id = event.event_user_id
            item.event_title = event.event_title
            item.event_start_date = event.event_start_date
            item.event_end_date = event.event_end_date
            item.event_location = event.event_location
            item.event_note = event.event_note
            item.event_notification = event.event_notification            

            db.commit()
            db.refresh(item)
            return {"message": "Event updated successfully"}
        else:
            return None
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nError Args:" + str(error.args))
        return None

