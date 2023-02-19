import fastapi
from fastapi import Depends
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import resource_type_schema
from api.services import resource_type_service

router = fastapi.APIRouter(
    prefix="/resource_type",
    tags=["resource types"]
)


@router.get("/", response_model=list[resource_type_schema.ResourceType])
async def retrieve_all_resource_types(db: Session = Depends(get_db)):
    return resource_type_service.get_all_resource_types(db=db)
