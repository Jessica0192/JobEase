from datetime import datetime
from pydantic import BaseModel
from pydantic_schemas.user_schema import User


class CommentBase(BaseModel):
    content: str
    post_id: int


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int
    user: User
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
