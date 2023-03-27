import os
import json
from datetime import datetime
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

CURR_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(CURR_DIR))
GOOGLE_RESOURCES_FOLDER_PATH = os.path.join(BASE_DIR, "google_resources")


def store_google_credentials(credentials, username: str):
    try:
        filename = f"{username}Credentials.json"
        user_specific_path = os.path.join(GOOGLE_RESOURCES_FOLDER_PATH, username)
        file_path = os.path.join(user_specific_path, filename)

        if not os.path.exists(GOOGLE_RESOURCES_FOLDER_PATH):
            os.makedirs(GOOGLE_RESOURCES_FOLDER_PATH)
        if not os.path.exists(user_specific_path):
            os.makedirs(user_specific_path)

        if os.path.isfile(file_path):
            print("Credential file already exists!")
            return

        credentials_dict = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes,
        }

        with open(file_path, 'w') as f:
            json.dump(credentials_dict, f)

    except Exception as error:
        print("\nAttribute missing while converting credentials object to the json\n"
              "Error Args:" + str(error.args))


def get_google_credentials(username: str):
    filename = f"{username}Credentials.json"
    user_specific_path = os.path.join(GOOGLE_RESOURCES_FOLDER_PATH, username)
    file_path = os.path.join(user_specific_path, filename)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as f:
            credentials_dict = json.load(f)
        return Credentials.from_authorized_user_info(info=credentials_dict)
    return False


def remove_google_credentials(username: str):
    filename = f"{username}Credentials.json"
    user_specific_path = os.path.join(GOOGLE_RESOURCES_FOLDER_PATH, username)
    file_path = os.path.join(user_specific_path, filename)

    if os.path.isfile(file_path):
        os.remove(file_path)
    return False


def create_google_event(username: str, summary: str, location: str, description: str, start: datetime, end: datetime):
    try:
        credentials = get_google_credentials(username)
        if credentials is not False:
            service = build('calendar', 'v3', credentials=credentials)
            event = {
                'summary': summary,
                'location': location,
                'description': description,
                'start': {
                    'dateTime': start.strftime("%Y-%m-%dT%H:%M:%S"),
                    'timeZone': 'America/New_York',
                },
                'end': {
                    'dateTime': end.strftime("%Y-%m-%dT%H:%M:%S"),
                    'timeZone': 'America/New_York',
                },
                'reminders': {
                    'useDefault': True
                },
            }
            event = service.events().insert(calendarId='primary', body=event).execute()
            return event.get('id')
        return None
    except Exception as error:
        print("FAIL:", error)
        return None
