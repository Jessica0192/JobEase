import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base


class JobNoteTypeEnum(str, enum.Enum):
    # Most of these note types are same with JobStatusEnum values; however,
    # Python doesn't allow extending an Enum class with another Enum class,
    # so we have to duplicate these values here
    interested = "Interested"
    applied = "Applied"
    waiting_for_interview = "Waiting for interview"
    interviewed = "Interviewed"
    other = "Other"


class JobNoteType(Base):
    __tablename__ = "job_note_types"

    id = Column(Integer, primary_key=True, index=True)
    note_type_name = Column(Enum(JobNoteTypeEnum, values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    job_notes = relationship("JobNote", back_populates="job_note_type")

    def __init__(self, note_type_name):
        super(JobNoteType, self).__init__()
        self.note_type_name = note_type_name
