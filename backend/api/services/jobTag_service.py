from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.jobTag_model import JobTag
from pydantic_schemas import user_schema
from core.hashing import Hasher


def get_all_tags(db: Session, limit: int = 100):
    return db.query(JobTag).limit(limit).all()
