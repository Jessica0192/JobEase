from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventBase(BaseModel):
    pass    


class Event(EventBase):
    id: int
    event_user_id: int
    event_title: str
    event_start_date: Optional[datetime] = None
    event_end_date: Optional[datetime] = None
    event_location: Optional[str] = None
    event_note: Optional[str] = None
    event_notification: Optional[str] = None
    
    class Config:
        orm_mode = True
