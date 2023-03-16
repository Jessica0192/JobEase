from datetime import datetime
from pydantic import BaseModel


class PostBase(BaseModel):
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    post_user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
