from sqlalchemy.orm import Session
from db.models.resource_extension_type_model import ResourceExtensionType, ResourceExtensionTypeEnum
from db.db_setup import get_db


def populate_initial_data():
    # Get the db session from Generator object (yield)
    db = next(get_db())
    for resource_extension_type in ResourceExtensionTypeEnum:
        db.add(ResourceExtensionType(resource_extension_type))
    db.commit()
    db.close()


def get_all_resource_extension_types(db: Session):
    return db.query(ResourceExtensionType).all()
