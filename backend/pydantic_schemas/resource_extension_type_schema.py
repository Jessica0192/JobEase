from pydantic import BaseModel
from db.models.resource_extension_type_model import ResourceExtensionTypeEnum


class ResourceExtensionType(BaseModel):
    id: int
    resource_extension_type: ResourceExtensionTypeEnum

    class Config:
        orm_mode = True
