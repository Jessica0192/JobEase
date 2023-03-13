from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import event

from core.config import settings
from db.db_setup import engine, Base
from db.models import user_model, job_record_model, job_tag_model, job_status_model, \
    resource_type_model, resource_model, resource_extension_type_model, portfolio_model, job_note_model, \
    job_note_type_model, event_model
from api import user_router, auth_router, job_record_router, job_tag_router, job_status_router, \
    resource_type_router, resource_router, resource_extension_type_router, portfolio_router, dashboard_router, event_router
from api.services import resource_type_service, resource_extension_type_service, \
    job_status_service, job_tag_service, job_note_type_service, event_service   


# Event listener that is executed after create_all method has been called for tables
# If this is the initial creation then it calls a service method to populate initial data
@event.listens_for(Base.metadata, 'after_create')
def receive_after_create(target, connection, tables, **kw):
    if tables:
        for i in tables:
            if str(i) == resource_type_model.ResourceType.__tablename__:
                resource_type_service.populate_initial_data()
                print("Initial data for Resource Type table has been populated")
            if str(i) == resource_extension_type_model.ResourceExtensionType.__tablename__:
                resource_extension_type_service.populate_initial_data()
                print("Initial data for Resource Extension Type table has been populated")
            if str(i) == job_status_model.JobStatus.__tablename__:
                job_status_service.populate_initial_data()
                print("Initial data for job status table has been populated")
            if str(i) == job_tag_model.JobTag.__tablename__:
                job_tag_service.populate_initial_data()
                print("Initial data for job tag Type table has been populated")
            if str(i) == job_note_type_model.JobNoteType.__tablename__:
                job_note_type_service.populate_initial_data()
                print("Initial data for Job Note Type table has been populated")


# Bind models
user_model.Base.metadata.create_all(bind=engine)
job_note_model.Base.metadata.create_all(bind=engine)
job_record_model.Base.metadata.create_all(bind=engine)
job_tag_model.Base.metadata.create_all(bind=engine)
job_status_model.Base.metadata.create_all(bind=engine)
resource_type_model.Base.metadata.create_all(bind=engine)
resource_extension_type_model.Base.metadata.create_all(bind=engine)
resource_model.Base.metadata.create_all(bind=engine)
portfolio_model.Base.metadata.create_all(bind=engine)
event_model.Base.metadata.create_all(bind=engine)
job_note_type_model.Base.metadata.create_all(bind=engine)

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
app.include_router(resource_type_router.router)
app.include_router(resource_router.router)
app.include_router(resource_extension_type_router.router)
app.include_router(portfolio_router.router)
app.include_router(event_router.router)
app.include_router(dashboard_router.router)


@app.get("/")
async def root():
    return {"message": "Welcome to Home Page!"}
