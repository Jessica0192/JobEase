from datetime import datetime
from pydantic import BaseModel


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_super_user: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
