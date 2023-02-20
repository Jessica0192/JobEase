from pydantic import BaseModel
from db.models.resource_type_model import ResourceTypeEnum


class ResourceType(BaseModel):
    id: int
    resource_type: ResourceTypeEnum

    class Config:
        orm_mode = True
