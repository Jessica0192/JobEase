import os
import fastapi
import requests

from fastapi.responses import RedirectResponse
from api.services import google_service
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
SCOPES = ["https://www.googleapis.com/auth/calendar.events",
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
async def callback(code: str):
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES, redirect_uri=REDIRECT_URI)
    flow.fetch_token(code=code)

    credentials = flow.credentials

    # Get user info using access token
    url = "https://www.googleapis.com/oauth2/v3/userinfo"
    headers = {
        "Authorization": f"Bearer {credentials.token}"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        user_info = response.json()
        userid = user_info["given_name"] + user_info["sub"]
        google_service.store_google_credentials(credentials, userid)
        return "Google Authentication is successful"
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return "Google Authentication has failed!"


@router.get("/revoke")
async def revoke_credentials():
    credentials = google_service.get_google_credentials("enes")
    revoke = requests.post('https://oauth2.googleapis.com/revoke',
                           params={'token': credentials.token},
                           headers={'content-type': 'application/x-www-form-urlencoded'})

    status_code = revoke.status_code
    if status_code == 200:
        google_service.remove_google_credentials("enes")
        return 'Google Credentials successfully revoked.'
    else:
        return 'An error occurred while revoking Google credentials.'
