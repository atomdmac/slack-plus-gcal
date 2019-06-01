# Slack :heavy_plus_sign: GCal
A proof-of-concept Slack app that allows you to access your Google Calendar from within Slack.

## Local Setup
- Create a new Slack app with the desired slash commands.
- Create a new set of Google API credentials by:
  - [Creating a new project](https://console.developers.google.com/projectcreate)
  - Create a set of OAuth credentials with appropriate redirect URLs.
- Fill in the Google OAuth credentials in `./config/bot.env`
- Start the app and database servers w/ Docker: `docker-compose up`
- Run the database migrations: `npx knex migrate:latest`

## Useful Endpoints
| Endpoint | Description |
|-----------------------|--------------------------------------------------------------------------------------------------|
| /auth-google/code | Callback for completing the Google OAuth flow. |
| /commands/list-events |  Slash command endpoint for the /list-events command |
| /debug/ping | Simple ping endpoint to check system health. |
| /debug/users | Show a list of Slack user IDs that are currently registered.  Should be disabled for production. |
## Commands
| Command | Description |
|----------------|--------------------------------------------------------------|
| `/list-events` | List the next 10 events that occur in your primary calendar. |
