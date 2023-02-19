import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.user_model import User
from pydantic_schemas import resource_schema
from api.services import resource_service, auth_service

router = fastapi.APIRouter(
    prefix="/resource",
    tags=["resources"]
)

# current_user: User = Depends(auth_service.get_current_user_from_token)


@router.get("/{resource_id}", response_model=resource_schema.Resource)
async def retrieve_resource_by_id(resource_id: int,
                                  db: Session = Depends(get_db)):

    db_resource = resource_service.get_resource_by_id(db=db, resource_id=resource_id)
    if db_resource is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    return db_resource


@router.get("/", response_model=list[resource_schema.Resource])
async def retrieve_all_resources(limit: int = 100,
                                 db: Session = Depends(get_db)):
    return resource_service.get_all_resources(db=db, limit=limit)


@router.post("/", response_model=resource_schema.Resource)
async def create_new_resource(resource: resource_schema.ResourceCreate,
                              db: Session = Depends(get_db)):
    db_resource = resource_service.create_resource(db=db, resource=resource)
    if db_resource is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Resource already exists")

    return db_resource


@router.delete("/{resource_id}")
def delete_resource(resource_id: int,
                    db: Session = Depends(get_db)):
    db_resource = resource_service.delete_resource_by_id(db=db, resource_id=resource_id)
    if db_resource is False:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found, so cannot be deleted")
    return {"message": "Successfully deleted"}
