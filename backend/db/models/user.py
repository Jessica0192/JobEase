from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class User(Base, Timestamp):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    email = Column(String(45), nullable=False)
    username = Column(String(45), nullable=False)
    password = Column(String(60), nullable=False)
