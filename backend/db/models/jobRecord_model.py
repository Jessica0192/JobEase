import datetime
from sqlalchemy import Boolean, Float, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.orm import relationship, backref

from .tables.job_record_tag_table import job_record_tag
from ..db_setup import Base
from .mixins import Timestamp


class JobRecord(Base, Timestamp):
    __tablename__ = "job_record"

    id = Column(Integer, primary_key=True, index=True)
    # userID
    # jobStatus
    tags = relationship("JobTag", secondary=job_record_tag, back_populates="job_records")
    # portfolio
    job_title = Column(String(45), nullable=False, unique=True)
    deadline_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    interview_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    organization_name = Column(String(45), nullable=True)
    salary = Column(Float, nullable=True)
    notes = Column(String(100), nullable=True)
    job_url = Column(String(45), nullable=True)
    location = Column(String(45), nullable=True)
