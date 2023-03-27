import os
import fastapi
import requests

from sqlalchemy.orm import Session
from db.db_setup import get_db
from fastapi import Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from db.models.user_model import User
from api.services import google_service, user_service, auth_service
from google_auth_oauthlib.flow import Flow

router = fastapi.APIRouter(
    prefix="/google",
    tags=["google"]
)

# Client secrets file from Google Cloud Console
CLIENT_SECRETS_FILE = os.path.join(os.path.dirname(__file__), '..', 'client_secrets.json')
# Authorized redirect URI from Google Cloud Console
REDIRECT_URI = "http://localhost:8000/google/oauth2callback"
# The scopes for Google Calendar API
SCOPES = ["openid",
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/calendar.events",
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/userinfo.profile"]


@router.get("/authenticate")
async def google_authenticate():
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)
    flow.redirect_uri = REDIRECT_URI

    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true')
    return RedirectResponse(url=authorization_url)


@router.get("/oauth2callback")
async def callback(code: str,
                   db: Session = Depends(get_db)):
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES, redirect_uri=REDIRECT_URI)
    flow.fetch_token(code=code)

    credentials = flow.credentials

    # Get user info using access token
    url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + credentials.token

    response = requests.get(url)

    if response.status_code == 200:
        user_info = response.json()
        db_user = user_service.get_user_by_email(db=db, email=user_info["email"])

        if db_user is None:
            await revoke_credentials_helper(credentials)
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User with provided gmail not found")

        google_service.store_google_credentials(credentials, db_user.email)
        return "Google Authentication is successful"
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return "Google Authentication has failed!"


@router.delete("revoke")
async def revoke_credentials(current_user: User = Depends(auth_service.get_current_user_from_token)):
    credentials = google_service.get_google_credentials(current_user.email)

    if credentials is False:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Google Credentials not found")

    result = await revoke_credentials_helper(credentials)

    if result is True:
        google_service.remove_google_credentials(current_user.email)
        return 'Google Credentials successfully revoked.'
    else:
        return 'An error occurred while revoking Google credentials.'


async def revoke_credentials_helper(credentials):
    revoke = requests.post('https://oauth2.googleapis.com/revoke',
                           params={'token': credentials.token},
                           headers={'content-type': 'application/x-www-form-urlencoded'})

    status_code = revoke.status_code
    if status_code == 200:
        return True
    else:
        return False
