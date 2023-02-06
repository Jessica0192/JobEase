import pytest
from httpx import AsyncClient

from tests.test_db_setup import app, override_get_db
from db.models.user_model import User


def get_dummy_user():
    return User(first_name="Test",
                last_name="User",
                email="testUser@gmail.com",
                username="testUser",
                hashed_password="$2b$12$gLIpwYE/N0JA10gXXl9hyuAqqFv1RQICW0YuS0/pb2o1aUnLXKtXK")


@pytest.mark.asyncio
async def test_retrieve_user_by_id():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Arrange
        database = next(override_get_db())
        new_user = get_dummy_user()

        database.add(new_user)
        database.commit()
        database.refresh(new_user)

        # Act
        response = await ac.get("/user/" + str(new_user.id))

    # Assert
    assert response.status_code == 200
    assert response.json()["email"] == new_user.email


@pytest.mark.asyncio
async def test_create_new_user():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Arrange
        database = next(override_get_db())

        # Act
        response = await ac.post("/user/", json={
            "first_name": "string",
            "last_name": "string",
            "email": "testUser2@gmail.com",
            "username": "testUser2",
            "password": "string"
        })

        db_user = database.query(User).filter(User.email == "testUser2@gmail.com").first()

    # Assert
    assert response.status_code == 200
    assert response.json()["email"] == "testUser2@gmail.com"
    assert db_user is not None


@pytest.mark.asyncio
async def test_retrieve_all_users():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Arrange
        database = next(override_get_db())
        new_user = get_dummy_user()
        new_user.email = "testUser3@gmail.com"
        new_user.username = "testUser3"

        database.add(new_user)
        database.commit()
        database.refresh(new_user)
        # Act
        response = await ac.get("/user/all_users/")

    # Assert
    assert response.status_code == 200
    assert response.json()[2]["username"] == new_user.username
