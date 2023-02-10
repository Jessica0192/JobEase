import datetime
from sqlalchemy import Boolean, Float, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class JobRecord(Base, Timestamp):
    __tablename__ = "jobRecords"

    id = Column(Integer, primary_key=True, index=True)
    # userID = Column(Integer, ForeignKey("users.id"))
    # jobStatus = Column(Integer, ForeignKey("jobStatus.id"), nullable=False)
    # tags = Column(Integer, ForeignKey("tags.id"))
    # tags = relationship("tags", backref=backref("tag", order_by=id))
    # portfolio = Column(Integer, ForeignKey("portfolio.id"))
    job_title = Column(String(45), nullable=False, unique=True)
    deadline_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    interview_date = Column(DateTime, default=datetime.datetime.utcnow, nullable=True)
    organization_name = Column(String(45), nullable=True)
    salary = Column(Float, nullable=True)
    notes = Column(String(100), nullable=True)
    job_url = Column(String(45), nullable=True)
    location = Column(String(45), nullable=True)
