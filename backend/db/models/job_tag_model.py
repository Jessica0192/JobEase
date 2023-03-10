import enum
from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from .job_record_model import job_record_tag
from ..db_setup import Base
from .mixins import Timestamp


class JobTagEnum(str, enum.Enum):
    interested = "Interested",
    applied = "Applied"
    waiting_for_interview = "Waiting for interview"
    interviewed = "Interviewed"
    offer_received = "Offer Received"
    offer_accepted = "Offer Accepted"
    offer_declined = "Offer Declined"
    rejected = "Rejected"


class JobTag(Base):
    __tablename__ = "job_tag"

    id = Column(Integer, primary_key=True, index=True)
    tag_name = Column(Enum(JobTagEnum, values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    job_records = relationship("JobRecord", secondary=job_record_tag, back_populates="tags", cascade="all, delete")

    def __init__(self, tag_name):
        super(JobTag, self).__init__()
        self.tag_name = tag_name
