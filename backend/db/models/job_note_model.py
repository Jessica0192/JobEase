from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import LONGTEXT

from ..db_setup import Base
from .mixins import Timestamp


class JobNote(Base, Timestamp):
    __tablename__ = "job_notes"

    id = Column(Integer, primary_key=True, index=True)
    note_job_record_id = Column(Integer, ForeignKey("job_record.id"))   # FK added
    title = Column(String(45), nullable=True)
    note_content = Column(LONGTEXT, nullable=True)

    job_record = relationship("JobRecord", back_populates="job_notes")

    def __init__(self, title, note_content, note_job_record_id):
        super(JobNote, self).__init__()
        self.title = title
        self.note_content = note_content
        self.note_job_record_id = note_job_record_id
