from datetime import datetime
from pydantic import BaseModel
from pydantic_schemas.user_schema import User


class CommentBase(BaseModel):
    content: str


class CommentCreate(CommentBase):
    post_id: int


class CommentUpdate(CommentBase):
    pass


class Comment(CommentBase):
    id: int
    post_id: int
    user: User
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
