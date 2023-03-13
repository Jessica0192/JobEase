from pydantic import BaseModel
from db.models.job_tag_model import JobTagEnum


class JobSearchMetric(BaseModel):
    job_tag_id: int
    tag_name: JobTagEnum
    num_of_items_for_tag: int

    class Config:
        orm_mode = True
