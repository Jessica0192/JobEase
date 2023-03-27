import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Event(Base, Timestamp):
    __tablename__ = "Events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_record_id = Column(Integer, ForeignKey("job_record.id"))
    title = Column(String(85), nullable=False)
    start = Column(DateTime(timezone=True), nullable=False)
    end = Column(DateTime(timezone=True), nullable=True, server_default=None)    
    location = Column(String(85), nullable=True, server_default=None)    
    note = Column(String(200), nullable=True, server_default=None)
    notification = Column(Integer, nullable=True, server_default='1')
    google_event_id = Column(String(200), nullable=True)

    user = relationship("User", back_populates="events")
    job_record = relationship("JobRecord", backref="events")

    def __init__(self, event_title, event_start, event_end, event_location, event_note, event_notification, event_user_id, event_job_record_id):
        super(Event, self).__init__()
        self.title = event_title
        self.start = event_start
        self.end = event_end
        self.location = event_location
        self.note = event_note
        self.notification = event_notification
        self.user_id = event_user_id
        self.job_record_id = event_job_record_id
