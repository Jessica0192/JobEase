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
                                        resource_user_id=db_resource.resource_user_id
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


def create_resource(db: Session, resource: resource_schema.ResourceCreate, resource_user_id: int, resource_name: str):
    try:
        db_resource = Resource(resource_name=resource_name,
                               resource_type_id=resource.resource_type_id,
                               resource_extension_type_id=resource.resource_extension_type_id,
                               resource_user_id=resource_user_id)
        db.add(db_resource)
        db.commit()
        db.refresh(db_resource)
        return db_resource
    except IntegrityError as error:
        # TODO 2 different errors code 1452 for inserting resource type that does not exist
        #  code 1062 for duplicate entry
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new resource with duplicate resource name\n"
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
