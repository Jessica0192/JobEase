from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .jobRecord_model import job_record_tag
from ..db_setup import Base
from .mixins import Timestamp


# TODO: Need to find a way how to add initial data to JobStatus (e.g. 'Interested', 'Applied' ...)
class JobStatus(Base):
    __tablename__ = "job_status"

    id = Column(Integer, primary_key=True, index=True)
    status_name = Column(String(45), nullable=False)
    job_records = relationship('JobRecord', back_populates='status')
