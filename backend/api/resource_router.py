import fastapi
from fastapi.responses import FileResponse
from fastapi import Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.user_model import User
from pydantic_schemas import resource_schema
from api.services import resource_service, auth_service

router = fastapi.APIRouter(
    prefix="/resource",
    tags=["resources"]
)


def check_if_resource_exits_and_current_user_can_access(resource_id: int,
                                                        current_user: User,
                                                        db: Session = Depends(get_db)):
    db_resource = resource_service.check_by_id_if_resource_exists_for_user(db=db,
                                                                           resource_id=resource_id,
                                                                           user_id=current_user.id)
    if db_resource is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    if current_user.id != db_resource.resource_user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return db_resource


@router.get("/{resource_id}/display/")
async def display_resource_by_id(resource_id: int,
                                 db: Session = Depends(get_db),
                                 current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_resource = check_if_resource_exits_and_current_user_can_access(db=db,
                                                                      resource_id=resource_id,
                                                                      current_user=current_user)

    if db_resource:
        file_path = resource_service.get_resource_from_store(username=current_user.username,
                                                             filename=db_resource.resource_name)
        if file_path is False:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
        return FileResponse(file_path)


@router.get("/{resource_id}/download/")
async def download_resource_by_id(resource_id: int,
                                  db: Session = Depends(get_db),
                                  current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_resource = check_if_resource_exits_and_current_user_can_access(db=db,
                                                                      resource_id=resource_id,
                                                                      current_user=current_user)

    if db_resource:
        file_name = db_resource.resource_name
        file_path = resource_service.get_resource_from_store(username=current_user.username,
                                                             filename=file_name)
        if file_path is False:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
        return FileResponse(file_path, headers={"Content-Disposition": "attachment; filename=" + file_name})


@router.get("/{resource_id}", response_model=resource_schema.Resource)
async def retrieve_resource_info_by_id(resource_id: int,
                                       db: Session = Depends(get_db),
                                       current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_resource = check_if_resource_exits_and_current_user_can_access(db=db,
                                                                      resource_id=resource_id,
                                                                      current_user=current_user)

    if db_resource:
        return db_resource


@router.get("/", response_model=list[resource_schema.Resource])
async def retrieve_all_resources_for_user(limit: int = 100,
                                          db: Session = Depends(get_db),
                                          current_user: User = Depends(auth_service.get_current_user_from_token)):
    return resource_service.get_all_resources_for_user(db=db, limit=limit, user_id=current_user.id)


@router.get("/all_resources/", response_model=list[resource_schema.Resource])
async def retrieve_all_resources(limit: int = 100,
                                 db: Session = Depends(get_db),
                                 current_user: User = Depends(auth_service.get_current_user_from_token)):
    if current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    return resource_service.get_all_resources(db=db, limit=limit)


@router.post("/", response_model=resource_schema.Resource)
async def create_new_resource(resource: resource_schema.ResourceCreate = Depends(),
                              file: UploadFile = File(...),
                              db: Session = Depends(get_db),
                              current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_resource = resource_service.create_resource(db=db, resource=resource,
                                                   resource_user_id=current_user.id,
                                                   resource_name=file.filename)
    if db_resource is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Resource already exists or"
                                   "trying to create a new one with invalid resource type or extension type")

    await resource_service.store_resource(username=current_user.username, file=file)
    return db_resource


@router.delete("/{resource_id}")
def delete_resource(resource_id: int,
                    db: Session = Depends(get_db),
                    current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_resource = resource_service.get_resource_by_id(db=db, resource_id=resource_id)

    if db_resource is not None:
        file_name = db_resource.resource_name
        if current_user.id != db_resource.resource_user_id and current_user.is_super_user is False:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

        deleted_resource = resource_service.delete_resource_by_id(db=db, resource_id=resource_id)
        if deleted_resource is False:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Resource not found, so cannot be deleted")
        resource_service.remove_resource_from_store(username=current_user.username, filename=file_name)
        return {"message": "Successfully deleted"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found, so cannot be deleted")
