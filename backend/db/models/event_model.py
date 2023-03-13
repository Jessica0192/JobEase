import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Event(Base, Timestamp):
    __tablename__ = "Events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(85), nullable=False)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=True, server_default=None)    
    location = Column(String(85), nullable=True, server_default=None)    
    note = Column(String(200), nullable=True, server_default=None)
    notification = Column(Integer, nullable=True, server_default='1')
    

    user = relationship("User", back_populates="events")

    def __init__(self, event_title, event_start_date, event_end_date, event_location, event_note, event_notification, event_user_id):
        super(Event, self).__init__()
        self.title = event_title
        self.start_date = event_start_date
        self.end_date = event_end_date
        self.location = event_location
        self.note = event_note
        self.notification = event_notification
        self.user_id = event_user_id
