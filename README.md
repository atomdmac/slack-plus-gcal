# Slack :heavy_plus_sign: GCal
A proof-of-concept Slack app that allows you to access your Google Calendar from within Slack.

## Local Setup
- If running locally, use something like `ngrok` to forward external traffic from Slack and Google OAuth2 to your local server.
  - Make sure both the Slack app and the Google OAuth2 credentials are pointing to your port forwarding service of choice.
- Fill in the Google OAuth credentials in `./config/credentials-google.json`
- Start the app and database servers w/ Docker: `docker-compose up`
- Run the database migrations: `npx knex migrate:latest`

## Commands
- `/list-events`: List the next 10 events on your calendar
