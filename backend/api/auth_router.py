import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import auth_schema
from api.services import auth_service

router = fastapi.APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login/")
async def authenticate(user: auth_schema.Login, db: Session = Depends(get_db)):
    auth_user = auth_service.authenticate_user(db=db, username=user.username, password=user.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    return {"access_token": "token_goes_here", "token_type": "bearer"}
