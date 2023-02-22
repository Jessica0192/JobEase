import enum
from sqlalchemy import Column, Integer, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class ResourceExtensionTypeEnum(str, enum.Enum):
    plain_text = "text/plain"
    pdf = "application/pdf"
    image_jpeg = "image/jpeg"
    image_jpg = "image/jpg"
    image_png = "image/png"
    audio = "audio/mpeg"
    video = "video/mp4"


class ResourceExtensionType(Base, Timestamp):
    __tablename__ = "resource_extension_types"

    id = Column(Integer, primary_key=True)
    resource_extension_type = Column(Enum(ResourceExtensionTypeEnum,
                                          values_callable=lambda obj: [e.value for e in obj]),
                                     nullable=False)
    resources = relationship("Resource", back_populates="resource_extension_type")

    def __init__(self, resource_extension_type):
        self.resource_extension_type = resource_extension_type
