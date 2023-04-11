
# JobEase

JobEase is a web application designed to assist job seekers in efficiently organizing and tracking their job applications in one place. Unlike using spreadsheets, JobEase offers a more professional solution to keep track of job opportunities from any platform. Users can easily monitor job descriptions, application status, links, related documents, salary information, notes, and more. 

The application also enables users to create portfolios for specific job applications, which can be exported for interview preparation or presentation. With the JobEase calendar, users can create events, view upcoming interview dates and application deadlines and integrate it with their Google Calendar. Additionally, the JobEase dashboard presents analytics and metrics in a readable format, while the community provides a platform for job seekers to share their experiences and engage with each other.
## Project Structure

This project consists of a frontend and a backend. The frontend is built using Vue.js, while the backend is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

The frontend and backend projects are organized in separate directories:

- **frontend/** - Contains the source code for the Vue.js frontend application.
- **backend/** - Contains the source code for the FastAPI backend application.
## Tech Stack

The JobEase application is built using the following technologies:

- **Frontend:** Vue.js, Vuex, Vue Router, axios
- **Backend:** Python, FastAPI, SQLAlchemy, Alembic, MySQL, Pydantic
- **Testing:** Jest, Vue Test Utils, Pytest
## Requirements

Before running the application, make sure you have the following software installed:

- Node.js (v14 or later)
- Python (v3.9 or later)
- MySQL
## Configuration

This project expects a **.env** file to be present in the root directory of the backend project. This file should contain environment variables that are used to configure the application. 

Here's an example .env file:

``` makefile
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_SERVER=localhost
MYSQL_PORT=3306
MYSQL_DB=job_ease
MYSQL_TEST_DB=test_job_ease
SECRET_KEY= use `openssl rand -hex 32` to generate the key
```

You will also need to have a **client_secrets.json** file in the root directory of the project in order to integrate with Google Calendar. This file contains the OAuth 2.0 client ID and client secret for the Google Calendar API. You can obtain these credentials by following the instructions in the [Google Calendar API](https://developers.google.com/workspace/guides/configure-oauth-consent) documentation.

Here's an example client_secrets.json file:

``` json
{
   "web":{
      "client_id":"",
      "project_id":"",
      "auth_uri":"",
      "token_uri":"",
      "auth_provider_x509_cert_url":"",
      "client_secret":"",
      "redirect_uris":[
         "http://localhost:8000/google/oauth2callback"
      ],
      "javascript_origins":[
         "http://localhost:8080",
         "http://localhost"
      ]
   }
}
```

Make sure to create these files (client_secrets is optional) and fill in the appropriate values for your environment before running the backend application.
## Backend Project
### Project Setup
To get started with the backend project, follow these steps:
``` bash
# Open a terminal window and navigate to the `backend/` directory
cd JobEase/backend/

# create a virtual environment
python -m venv venv

# activate the environment
source ./venv/Scripts/activate

# make sure you are using the correct virtual environment
which pip

# upgrade pip
python -m pip install --upgrade pip

# install dependencies
pip install -r requirements.txt

# serve with hot reload at localhost:8000
uvicorn main:app --reload
```
For a detailed explanation on how things work, check out the [guide](https://fastapi.tiangolo.com/).
## Frontend Project
### Project Setup
To get started with the frontend project, follow these steps:
``` bash
# Open a terminal window and navigate to the `frontend/` directory
cd JobEase/frontend/

# Install the required dependencies
npm install

# Start a local development server
npm run serve
```
See [Configuration Reference](https://cli.vuejs.org/config/).
## Authors

- [@EDemirsoz](https://github.com/EDemirsoz)
- [@Hodaak](https://github.com/Hodaak)
- [@Jessica0192](https://github.com/Jessica0192)


## Demo
- Special thanks to [@JayMurph](https://github.com/JayMurph) for voiceover!

https://user-images.githubusercontent.com/64825806/231053052-0cb53aed-7d77-49bb-ab7f-f472db133a69.mp4

## Contributing

Contributions to the JobEase project are welcome! To get started, fork this repository and create a pull request with your changes.

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License
This project is licensed under the MIT License - see the LICENSE file for details.
