from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Resource(Base, Timestamp):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    resource_name = Column(String(45), nullable=False, unique=True)
    resource_type_id = Column(Integer, ForeignKey("resource_types.id"))
    resource_extension_type_id = Column(Integer, ForeignKey("resource_extension_types.id"))
    resource_user_id = Column(Integer, ForeignKey("users.id"))

    resource_type = relationship("ResourceType", back_populates="resources")
    resource_extension_type = relationship("ResourceExtensionType", back_populates="resources")
    user = relationship("User", back_populates="resources")

    def __init__(self, resource_name, resource_type_id, resource_extension_type_id, resource_user_id):
        self.resource_name = resource_name
        self.resource_type_id = resource_type_id
        self.resource_extension_type_id = resource_extension_type_id
        self.resource_user_id = resource_user_id
