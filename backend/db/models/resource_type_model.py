import enum
from sqlalchemy import Column, Integer, Enum

from ..db_setup import Base
from .mixins import Timestamp


class ResourceTypeEnum(str, enum.Enum):
    resume = "Resume"
    cover_letter = "CoverLetter"
    other = "Other"


class ResourceType(Base, Timestamp):
    __tablename__ = "resource_type"

    id = Column(Integer, primary_key=True)
    resource_type = Column(Enum(ResourceTypeEnum))

    def __init__(self, resource_type):
        self.resource_type = resource_type
