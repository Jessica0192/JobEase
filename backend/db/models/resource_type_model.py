import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class ResourceTypeEnum(str, enum.Enum):
    resume = "Resume"
    cover_letter = "Cover Letter"
    image = "Image"
    video = "Video"
    audio = "Audio"
    other = "Other"


class ResourceType(Base, Timestamp):
    __tablename__ = "resource_types"

    id = Column(Integer, primary_key=True)
    resource_type = Column(Enum(ResourceTypeEnum, values_callable=lambda obj: [e.value for e in obj]), nullable=False)
    resources = relationship("Resource", back_populates="resource_type")

    def __init__(self, resource_type):
        super(ResourceType, self).__init__()
        self.resource_type = resource_type
