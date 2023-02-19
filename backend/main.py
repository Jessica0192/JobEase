from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import event

from core.config import settings
from db.db_setup import engine, Base
from db.models import user_model, jobRecord_model, jobTag_model, resource_type_model, resource_model
from api import user_router, auth_router, jobRecord_router, jobTag_router, resource_type_router, resource_router
from api.services.resource_type_service import populate_initial_data


# Event listener that is executed after create_all method has been called for ResourceType table
# If this is the initial creation then it calls a service method to populate initial data
@event.listens_for(Base.metadata, 'after_create')
def receive_after_create(target, connection, tables, **kw):
    if tables:
        for i in tables:
            if str(i) == resource_type_model.ResourceType.__tablename__:
                populate_initial_data()
                print("Initial data for Resource Type table has been populated")


# Bind models
user_model.Base.metadata.create_all(bind=engine)
jobRecord_model.Base.metadata.create_all(bind=engine)
jobTag_model.Base.metadata.create_all(bind=engine)
resource_type_model.Base.metadata.create_all(bind=engine)
resource_model.Base.metadata.create_all(bind=engine)

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
app.include_router(jobRecord_router.router)
app.include_router(jobTag_router.router)
app.include_router(resource_type_router.router)
app.include_router(resource_router.router)


@app.get("/")
async def root():
    return {"message": "Welcome to Home Page!"}
