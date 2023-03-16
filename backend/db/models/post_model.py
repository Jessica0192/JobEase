from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Post(Base, Timestamp):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    post_user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String(280), nullable=False)

    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="posts")

    def __init__(self, content, post_user_id):
        super(Post, self).__init__()
        self.content = content
        self.post_user_id = post_user_id
