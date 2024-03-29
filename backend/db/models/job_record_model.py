from sqlalchemy import Float, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .tables.job_record_tag_table import job_record_tag
from ..db_setup import Base
from .mixins import Timestamp


class JobRecord(Base, Timestamp):
    __tablename__ = "job_record"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # FK added
    status_id = Column(Integer, ForeignKey('job_status.id'))    # FK added
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))    # FK added

    job_title = Column(String(45), nullable=False)
    deadline_date = Column(DateTime(timezone=True), nullable=True, server_default=None)
    interview_date = Column(DateTime(timezone=True), nullable=True, server_default=None)
    organization_name = Column(String(45), nullable=True)
    salary = Column(Float, nullable=True)
    description = Column(String(280), nullable=True)
    job_url = Column(String(45), nullable=True)
    location = Column(String(45), nullable=True)

    user = relationship("User", backref="job_records")
    status = relationship('JobStatus', back_populates='job_records')
    portfolio = relationship('Portfolio', back_populates='job_records')
    tags = relationship("JobTag", secondary=job_record_tag, back_populates="job_records")
    job_notes = relationship("JobNote", back_populates="job_record")
