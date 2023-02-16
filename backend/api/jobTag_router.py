import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import jobTag_schema
from api.services import jobTag_service

router = fastapi.APIRouter(
    prefix="/job_tag",
    tags=["job_tags"]
)


@router.get("/", response_model=list[jobTag_schema.JobTag])
async def retrieve_all_jobTags(limit: int = 100, db: Session = Depends(get_db)):
    return jobTag_service.get_all_tags(db=db, limit=limit)
