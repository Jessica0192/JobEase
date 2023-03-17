from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Comment(Base, Timestamp):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))
    content = Column(String(280), nullable=False)

    user = relationship("User", back_populates="comments")
    posts = relationship("Post", back_populates="comments")

    def __init__(self, content, user_id, post_id):
        super(Comment, self).__init__()
        self.content = content
        self.user_id = user_id
        self.post_id = post_id
