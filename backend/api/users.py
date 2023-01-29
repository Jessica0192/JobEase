import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas.user import UserCreate, User
from api.utils.users import get_user_by_id, get_all_users, create_user

router = fastapi.APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.get("/get_user/{user_id}", response_model=User)
async def retrieve_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/get_all_users", response_model=list[User])
async def retrieve_all_users(limit: int = 100, db: Session = Depends(get_db)):
    return get_all_users(db=db, limit=limit)


@router.post("/create_user")
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db=db, user=user)
    # TODO Before creating a new user, check if user already exists (username or email)
    # TODO Don't return the created user since it includes password info
    return db_user
