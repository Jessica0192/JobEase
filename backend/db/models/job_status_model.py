import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class JobStatusEnum(str, enum.Enum):
    interested = "Interested",
    applied = "Applied"
    waiting_for_interview = "Waiting for interview"


class JobStatus(Base):
    __tablename__ = "job_status"

    id = Column(Integer, primary_key=True, index=True)
    status_name = Column(Enum(JobStatusEnum, values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    job_records = relationship("JobRecord", back_populates="status")

    def __init__(self, status_name):
        super(JobStatus, self).__init__()
        self.status_name = status_name
