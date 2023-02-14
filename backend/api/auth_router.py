import fastapi
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic_schemas.token_schema import Token

from db.db_setup import get_db
from api.services import auth_service

router = fastapi.APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login/", response_model=Token)
async def authenticate(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    auth_user = auth_service.authenticate_user(db=db, username=form_data.username, password=form_data.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = auth_service.create_access_token(data={"sub": auth_user.username})
    return {"access_token": access_token, "token_type": "bearer"}
