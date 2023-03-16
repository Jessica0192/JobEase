import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.event_model import Event
from db.models.user_model import User
from pydantic_schemas import event_schema
from api.services import event_service, auth_service

router = fastapi.APIRouter(
    prefix="/event",
    tags=["events"]
)


def check_if_event_exits_and_current_user_can_access(event_id: int,
                                                     current_user: User,
                                                     db: Session = Depends(get_db)):
    db_event = event_service.check_by_id_if_event_exists_for_user(db=db,
                                                                  event_id=event_id,
                                                                  user_id=current_user.id)
    if db_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    if current_user.id != db_event.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return db_event


@router.get("/{event_id}", response_model=event_schema.Event)
async def retrieve_event_info_by_id(event_id: int,
                                       db: Session = Depends(get_db),
                                       current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_event = check_if_event_exits_and_current_user_can_access(db=db,
                                                                event_id=event_id,
                                                                current_user=current_user)

    if db_event:
        return db_event


@router.get("/", response_model=list[event_schema.Event])
async def retrieve_all_events_for_user(limit: int = 100,
                                       db: Session = Depends(get_db),
                                       current_user: User = Depends(auth_service.get_current_user_from_token)):
    return event_service.get_all_events_for_user(db=db, limit=limit, user_id=current_user.id)


@router.post("/")
async def create_new_event(event: event_schema.EventCreate,
                           db: Session = Depends(get_db),
                           current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_event = event_service.create_event(user_id=current_user.id, db=db, event=event)
    if db_event is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Event with the same title already exists")
    return db_event


@router.delete("/{event_id}")
def delete_event(event_id: int,
                 db: Session = Depends(get_db),
                 current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_event = event_service.get_event_by_id(db=db, event_id=event_id)
    if db_event is not None:
        if current_user.id != db_event.user_id and current_user.is_super_user is False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

        deleted_event = event_service.delete_event_by_id(db=db, event_id=event_id)
        if deleted_event is False:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Event not found, so cannot be deleted")
        return {"message": "Successfully deleted"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found, so cannot be deleted")


@router.put("/{event_id}")
async def update_event(event_id: int,
                       event: event_schema.EventCreate,
                       db: Session = Depends(get_db),
                       current_user: User = Depends(auth_service.get_current_user_from_token)):
    event_user_id = db.query(Event).filter(Event.id == event_id).first().user_id

    if event_user_id != current_user.id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    db_event = event_service.update_event(db=db, event_id=event_id, event=event)

    if db_event is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Event with the same title already exists")
    
    return {"message": "Successfully updated"}
