from sqlalchemy.orm import Session
from db.models.resource_type_model import ResourceType, ResourceTypeEnum
from db.db_setup import get_db


def populate_initial_data():
    # Get the db session from Generator object (yield)
    db = next(get_db())
    for resource_type in ResourceTypeEnum:
        db.add(ResourceType(resource_type))
    db.commit()
    db.close()


def get_all_resource_types(db: Session):
    return db.query(ResourceType).all()
