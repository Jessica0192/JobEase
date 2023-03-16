from datetime import datetime
from typing import List
from pydantic import BaseModel
from pydantic_schemas.comment_schema import Comment


class PostBase(BaseModel):
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    user_id: int
    comments: List[Comment] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
