import os
import aiofiles
from fastapi import UploadFile
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.resource_model import Resource
from pydantic_schemas import resource_schema


CURR_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(CURR_DIR))
UPLOADED_RESOURCES_FOLDER_PATH = os.path.join(BASE_DIR, "uploaded_resources")


def get_resource_by_id(db: Session, resource_id: int):
    db_resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if db_resource:
        return resource_schema.Resource(id=db_resource.id,
                                        resource_name=db_resource.resource_name,
                                        resource_type_id=db_resource.resource_type_id,
                                        resource_type=db_resource.resource_type,
                                        resource_extension_type_id=db_resource.resource_extension_type_id,
                                        resource_extension_type=db_resource.resource_extension_type,
                                        resource_user_id=db_resource.resource_user_id,
                                        created_at=db_resource.created_at,
                                        updated_at=db_resource.updated_at
                                        )
    else:
        return None


def delete_resource_by_id(db: Session, resource_id: int):
    existing_resource = db.query(Resource).filter(Resource.id == resource_id)
    if not existing_resource.first():
        return False
    existing_resource.delete()
    db.commit()


def get_all_resources_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Resource).filter(Resource.resource_user_id == user_id).limit(limit).all()


def get_all_resources(db: Session, limit: int = 100):
    return db.query(Resource).limit(limit).all()


def check_by_id_if_resource_exists_for_user(db: Session, resource_id: int, user_id: int):
    db_resource = db.query(Resource).filter(Resource.id == resource_id,
                                            Resource.resource_user_id == user_id).first()
    if db_resource:
        return db_resource
    else:
        return None


def check_by_name_if_resource_exists_for_user(db: Session, resource_name: str, user_id: int):
    db_resource = db.query(Resource).filter(Resource.resource_name == resource_name,
                                            Resource.resource_user_id == user_id).first()
    if db_resource:
        return db_resource
    else:
        return None


def create_resource(db: Session, resource: resource_schema.ResourceCreate, resource_user_id: int, resource_name: str):
    try:
        existing_resource = check_by_name_if_resource_exists_for_user(db=db,
                                                                      resource_name=resource_name,
                                                                      user_id=resource_user_id)
        if existing_resource is not None:
            return None
        db_resource = Resource(resource_name=resource_name,
                               resource_type_id=resource.resource_type_id,
                               resource_extension_type_id=resource.resource_extension_type_id,
                               resource_user_id=resource_user_id)
        db.add(db_resource)
        db.commit()
        db.refresh(db_resource)
        return db_resource
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new resource with invalid resource type or extension type\n"
              "Error Args:" + str(error.args))
        return None


async def store_resource(username: str, file: UploadFile):
    user_specific_path = os.path.join(UPLOADED_RESOURCES_FOLDER_PATH, username)
    file_path = os.path.join(user_specific_path, file.filename)

    if not os.path.exists(UPLOADED_RESOURCES_FOLDER_PATH):
        os.makedirs(UPLOADED_RESOURCES_FOLDER_PATH)
    if not os.path.exists(user_specific_path):
        os.makedirs(user_specific_path)
    async with aiofiles.open(file_path, "wb") as outfile:
        content = await file.read()
        await outfile.write(content)


def get_resource_from_store(username: str, filename: str):
    user_specific_path = os.path.join(UPLOADED_RESOURCES_FOLDER_PATH, username)
    file_path = os.path.join(user_specific_path, filename)

    if os.path.isfile(file_path):
        return file_path
    return False


def remove_resource_from_store(username: str, filename: str):
    user_specific_path = os.path.join(UPLOADED_RESOURCES_FOLDER_PATH, username)
    file_path = os.path.join(user_specific_path, filename)

    if os.path.isfile(file_path):
        os.remove(file_path)
    return False
