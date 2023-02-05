import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import user_schema
from api.services import user_service

router = fastapi.APIRouter(
    prefix="/user",
    tags=["users"]
)


@router.get("/{user_id}", response_model=user_schema.User)
async def retrieve_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_id(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user


@router.get("/all_users/", response_model=list[user_schema.User])
async def retrieve_all_users(limit: int = 100, db: Session = Depends(get_db)):
    return user_service.get_all_users(db=db, limit=limit)


@router.post("/", response_model=user_schema.User)
async def create_new_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = user_service.create_user(db=db, user=user)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    return db_user

