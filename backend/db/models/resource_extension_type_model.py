import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class ResourceExtensionTypeEnum(str, enum.Enum):
    pdf = "Pdf"
    mp4 = "mp4"
    audio = "Audio"


class ResourceExtensionType(Base, Timestamp):
    __tablename__ = "resource_extension_types"

    id = Column(Integer, primary_key=True)
    resource_extension_type = Column(Enum(ResourceExtensionTypeEnum,
                                          values_callable=lambda obj: [e.value for e in obj]),
                                     nullable=False)
    resources = relationship("Resource", back_populates="resource_extension_type")

    def __init__(self, resource_extension_type):
        self.resource_extension_type = resource_extension_type
