import os
import json
from sqlalchemy.orm import Session
from datetime import datetime
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from db.models.event_model import Event

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
        print("Failed creating a Google event:", error)
        return None


def update_google_event(username: str, event_id: str, summary: str, location: str,
                        description: str, start: datetime, end: datetime):
    try:
        credentials = get_google_credentials(username)
        if credentials is not False:
            service = build('calendar', 'v3', credentials=credentials)

            # Get event
            event = service.events().get(calendarId='primary', eventId=event_id).execute()

            # Update event
            event['summary'] = summary
            event['location'] = location
            event['description'] = description
            event['start'] = {
                    'dateTime': start.strftime("%Y-%m-%dT%H:%M:%S"),
                    'timeZone': 'America/New_York',
            }
            event['end'] = {
                    'dateTime': end.strftime("%Y-%m-%dT%H:%M:%S"),
                    'timeZone': 'America/New_York',
            }

            updated_event = service.events().update(calendarId='primary', eventId=event['id'], body=event).execute()
            return updated_event.get('id')
        return None
    except Exception as error:
        print("Failed updating a Google event:", error)
        return None


def delete_google_event(username: str, event_id: str):
    try:
        credentials = get_google_credentials(username)
        if credentials is not False:
            service = build('calendar', 'v3', credentials=credentials)
            service.events().delete(calendarId='primary', eventId=event_id).execute()
            return True
        return None
    except Exception as error:
        print("Failed deleting a Google event:", error)
        return None


def delete_google_events_by_job_record_id(db: Session, username: str, job_record_id: int):
    try:
        credentials = get_google_credentials(username)
        if credentials is not False:
            service = build('calendar', 'v3', credentials=credentials)

            google_events = db.query(Event).filter(Event.job_record_id == job_record_id).all()

            for event in google_events:
                if event.google_event_id:
                    service.events().delete(calendarId='primary', eventId=event.google_event_id).execute()

            return True
        return None
    except Exception as error:
        print("Failed deleting a Google event:", error)
        return None
