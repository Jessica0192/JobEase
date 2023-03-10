import fastapi
from fastapi import Depends
from sqlalchemy.orm import Session
from db.models.user_model import User
from api.services import dashboard_service, auth_service
from pydantic_schemas import job_search_metrics_schema

from db.db_setup import get_db

router = fastapi.APIRouter(
    prefix="/metric",
    tags=["metrics"]
)


@router.get("/", response_model=list[job_search_metrics_schema.JobSearchMetric])
async def retrieve_job_search_metrics(db: Session = Depends(get_db),
                                      current_user: User = Depends(auth_service.get_current_user_from_token)):

    return dashboard_service.get_job_search_metrics_for_user(db=db, user_id=current_user.id)
