from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .jobRecord_model import job_record_tag
from ..db_setup import Base
from .mixins import Timestamp

# TODO: Need to find a way how to add initial data to JobTag (e.g. 'Interested', 'Applied' ...)
class JobTag(Base):
    __tablename__ = "job_tag"

    id = Column(Integer, primary_key=True, index=True)
    tag_name = Column(String(45), nullable=False)
    job_records = relationship("JobRecord", secondary=job_record_tag, back_populates="tags")
