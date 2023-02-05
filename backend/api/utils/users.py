from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db.models.user import User
from pydantic_schemas.user import UserCreate
from core.hashing import Hasher


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session, limit: int = 100):
    return db.query(User).limit(limit).all()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate):
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


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db=db, username=username)
    if user is None:
        return False
    if not Hasher.verify_password(password, user.hashed_password):
        return False
    return user
