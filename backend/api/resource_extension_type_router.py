import fastapi
from fastapi import Depends
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import resource_extension_type_schema
from api.services import resource_extension_type_service

router = fastapi.APIRouter(
    prefix="/resource_extension_type",
    tags=["resource extension types"]
)


@router.get("/", response_model=list[resource_extension_type_schema.ResourceExtensionType])
async def retrieve_all_resource_extension_types(db: Session = Depends(get_db)):
    return resource_extension_type_service.get_all_resource_extension_types(db=db)
