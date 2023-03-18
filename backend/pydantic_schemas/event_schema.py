from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventBase(BaseModel):
    title: str
    start: Optional[datetime] = None
    end: Optional[datetime] = None
    location: Optional[str] = None
    note: Optional[str] = None
    notification: Optional[int] = 1
        

class EventCreate(EventBase):
    pass
    

class Event(EventBase):
    id: int
    user_id: int
    
    class Config:
        orm_mode = True
