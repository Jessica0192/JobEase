from sqlalchemy.orm import Session
from db.models.user import User
from pydantic_schemas.user import UserCreate


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session, limit: int = 100):
    return db.query(User).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    db_user = User(first_name=user.first_name,
                   last_name=user.last_name,
                   email=user.email,
                   username=user.username,
                   # TODO Hashed the password here BEFORE saving it
                   password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
