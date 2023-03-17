from datetime import datetime
from typing import List
from pydantic import BaseModel
from pydantic_schemas.comment_schema import Comment
from pydantic_schemas.user_schema import User


class PostBase(BaseModel):
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    user: User
    comments: List[Comment] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
