import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from pydantic_schemas import job_tag_schema
from api.services import job_tag_service

router = fastapi.APIRouter(
    prefix="/job_tag",
    tags=["job_tags"]
)


@router.get("/", response_model=list[job_tag_schema.JobTag])
async def retrieve_all_jobTags(limit: int = 100, db: Session = Depends(get_db)):
    return job_tag_service.get_all_tags(db=db)
