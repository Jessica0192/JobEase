from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventBase(BaseModel):
    user_id: int
    title: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    note: Optional[str] = None
    notification: Optional[int] = 1
        

class EventCreate(EventBase):
    pass
    

class Event(EventBase):
    id: int
    
    class Config:
        orm_mode = True
