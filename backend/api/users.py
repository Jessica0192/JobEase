import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas.user import UserCreate, User, UserLogin
from api.utils.users import get_user_by_id, get_all_users, create_user, authenticate_user

router = fastapi.APIRouter(
    prefix="/user",
    tags=["users"]
)


@router.get("/{user_id}/", response_model=User)
async def retrieve_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user_by_id(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user


@router.get("/all_users/", response_model=list[User])
async def retrieve_all_users(limit: int = 100, db: Session = Depends(get_db)):
    return get_all_users(db=db, limit=limit)


@router.post("/", response_model=User)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db=db, user=user)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    return db_user


@router.post("/authenticate/")
async def authenticate(user: UserLogin, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db=db, username=user.username, password=user.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    return {"access_token": "token_goes_here", "token_type": "bearer"}
