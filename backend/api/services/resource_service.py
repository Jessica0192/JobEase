from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.resource_model import Resource
from pydantic_schemas import resource_schema


def get_resource_by_id(db: Session, resource_id: int):
    db_resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if db_resource:
        return resource_schema.Resource(id=db_resource.id,
                                        resource_name=db_resource.resource_name,
                                        resource_type_id=db_resource.resource_type_id,
                                        resource_type=db_resource.resource_type,
                                        resource_extension_type_id=db_resource.resource_extension_type_id,
                                        resource_extension_type=db_resource.resource_extension_type
                                        )
    else:
        return None


def get_all_resources(db: Session, limit: int = 100):
    return db.query(Resource).limit(limit).all()


def create_resource(db: Session, resource: resource_schema.ResourceCreate):
    try:
        db_resource = Resource(resource_name=resource.resource_name,
                               resource_type_id=resource.resource_type_id,
                               resource_extension_type_id=resource.resource_extension_type_id)
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
