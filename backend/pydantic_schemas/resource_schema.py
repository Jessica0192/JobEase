from pydantic import BaseModel
from pydantic_schemas.resource_type_schema import ResourceType
from pydantic_schemas.resource_extension_type_schema import ResourceExtensionType


class ResourceBase(BaseModel):
    pass


class ResourceCreate(ResourceBase):
    resource_type_id: int
    resource_extension_type_id: int


class Resource(ResourceBase):
    id: int
    resource_name: str
    resource_user_id: int
    resource_type: ResourceType
    resource_extension_type: ResourceExtensionType

    class Config:
        orm_mode = True
