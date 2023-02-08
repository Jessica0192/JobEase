from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings
from db.db_setup import Base, get_db
from main import app

SQLALCHEMY_TEST_DATABASE_URL = settings.get_test_database_url()

engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
