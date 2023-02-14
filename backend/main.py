from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from db.db_setup import engine
from db.models import user_model
from db.models import jobRecord_model
from db.models import jobTag_model
from api import user_router, auth_router, jobRecord_router, jobTag_router


# Bind models
user_model.Base.metadata.create_all(bind=engine)
jobRecord_model.Base.metadata.create_all(bind=engine)
jobTag_model.Base.metadata.create_all(bind=engine)

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

@app.get("/")
async def root():
    return {"message": "Welcome to Home Page!"}
