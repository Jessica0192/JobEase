from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.user_model import User
from pydantic_schemas import user_schema
from core.hashing import Hasher


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session, limit: int = 100):
    return db.query(User).limit(limit).all()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def delete_user_by_id(db: Session, user_id: int):
    existing_user = db.query(User).filter(User.id == user_id)
    if not existing_user.first():
        return False
    existing_user.delete()
    db.commit()


def create_user(db: Session, user: user_schema.UserCreate):
    try:
        db_user = User(first_name=user.first_name,
                       last_name=user.last_name,
                       email=user.email,
                       username=user.username,
                       # Hash the password for saving to the database
                       hashed_password=Hasher.get_password_hash(user.password))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new user with duplicate username or email\n"
              "Error Args:" + str(error.args))
        return None
