from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventBase(BaseModel):
    pass    

class EventCreate(BaseModel):
    user_id: int
    title: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    note: Optional[str] = None
    notification: Optional[int] = 1
    

class Event(EventBase):
    id: int
    user_id: int
    title: str
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    note: Optional[str] = None
    notification: Optional[int] = 1
    
    class Config:
        orm_mode = True
