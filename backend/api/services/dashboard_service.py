from sqlalchemy.orm import Session

from db.models.tables.job_record_tag_table import job_record_tag
from api.services import job_tag_service
from pydantic_schemas import job_search_metrics_schema


def get_job_search_metrics_for_user(db: Session, user_id: int):
    result = []
    job_tags = job_tag_service.get_all_tags(db=db)
    if job_tags is not None:
        for job_tag in job_tags:
            num_of_tags = db.query(job_record_tag).filter(job_record_tag.c.job_tag_id == job_tag.id).count()
            result.append(job_search_metrics_schema.JobSearchMetric(job_tag_id=job_tag.id,
                                                                    tag_name=job_tag.tag_name,
                                                                    num_of_items_for_tag=num_of_tags))
    return result
