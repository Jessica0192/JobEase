from core.hashing import Hasher
from sqlalchemy.orm import Session
from api.services import user_service


def authenticate_user(db: Session, username: str, password: str):
    user = user_service.get_user_by_username(db=db, username=username)
    if user is None:
        return False
    if not Hasher.verify_password(password, user.hashed_password):
        return False
    return user
