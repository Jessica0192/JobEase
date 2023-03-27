import os
import json
from google.oauth2.credentials import Credentials


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

    except AttributeError as error:
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
