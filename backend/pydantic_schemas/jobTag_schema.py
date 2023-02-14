from datetime import datetime
from pydantic import BaseModel
from typing import List


class JobTagBase(BaseModel):
    tag_name: str


class JobTag(JobTagBase):
    id: int

    class Config:
        orm_mode = True
