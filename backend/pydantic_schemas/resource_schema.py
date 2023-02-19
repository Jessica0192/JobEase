from pydantic import BaseModel
from pydantic_schemas.resource_type_schema import ResourceType


class ResourceBase(BaseModel):
    resource_name: str
    resource_type_id: int


class ResourceCreate(ResourceBase):
    pass


class Resource(ResourceBase):
    id: int
    resource_type: ResourceType

    class Config:
        orm_mode = True
