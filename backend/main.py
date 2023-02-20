from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from db.db_setup import engine, SessionLocal
from db.models import user_model
from db.models import job_record_model
from db.models import job_tag_model
from db.models import job_status_model
from api import user_router, auth_router, job_record_router, job_tag_router, job_status_router
from db.models.job_status_model import JobStatus

# Bind models
user_model.Base.metadata.create_all(bind=engine)
job_tag_model.Base.metadata.create_all(bind=engine)
job_status_model.Base.metadata.create_all(bind=engine)
job_record_model.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME,
              description=settings.PROJECT_DESCRIPTION,
              version=settings.PROJECT_VERSION)

# add CORS middleware to allow communication between frontend and backend that has different origins
origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)
app.include_router(auth_router.router)
app.include_router(job_record_router.router)
app.include_router(job_tag_router.router)
app.include_router(job_status_router.router)


@app.get("/")
async def root():
    return {"message": "Welcome to Home Page!"}
