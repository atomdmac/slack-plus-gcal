const {google} = require('googleapis');
const credentials = require('../../config').google.credentials;
const db = require('../db');

// If modifying these scopes, tokens will need to be refreshed.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
];

// Get an instance of the Google OAuth2Client.
function getOAuthClient() {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  return oAuth2Client;
}

/**
 * Middleware that will attach an OAuth2Client to the context object if the
 * requesting user has already linked their Google account.  Otherwise, return
 * a Slack message with a link directing the user to the OAuth2 flow.
 */
function authorize() {
  return async (ctx, next) => {
    const oAuth2Client = getOAuthClient();

    const user = await db.models.User
      .query()
      .where('slack_id', '=', ctx.request.body.user_id)
      .limit(1)
      .then(results => results[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      state: ctx.request.body.user_id
    });

    const failureMessage = {
      text: `Sorry, you're not currently logged into Google.  You can fix that <${authUrl}|here>.`
    };

    if (!user) {
      ctx.body = failureMessage;
    } else {
      oAuth2Client.setCredentials({
        access_token: user.google_access_token,
        refresh_token: user.google_refresh_token,
        expiry_date: user.google_token_expiry
      });
      ctx.googleOAuth2Client = oAuth2Client;

      await next()
        .catch(async error => {
          if (error.code === 401) {
            await db.models.User
              .query()
              .where('slack_id', ctx.request.body.user_id)
              .delete();
            ctx.body = failureMessage;
          } else {
            throw error;
          }
        })
    }
  }
}

/**
 * Middleware/route controller that allows a Google OAuth2 code to be exchanged
 * for an access token, stores tokens in the database, and returns a success
 * message.
 */
function exchangeAccessCode() {
  return async (ctx) => {
    const oAuth2Client = getOAuthClient();
    const code = ctx.query.code;
    const slackId = ctx.query.state;
    const tokens = await oAuth2Client
      .getToken(code)
      .then(res => res.tokens);

    const existingUser = await db.models.User
      .query()
      .where('slack_id', '=', slackId)
      .patch({
        google_access_token: tokens.access_token,
        google_refresh_token: tokens.refresh_token,
        google_token_expiry: new Date(tokens.expiry_date)
      })
      .then(results => !!results.length);

    if (!existingUser) {
      await db.models.User
        .query()
        .returning('slack_id')
        .insert({
          slack_id: slackId,
          google_access_token: tokens.access_token,
          google_refresh_token: tokens.refresh_token,
          google_token_expiry: new Date(tokens.expiry_date)
        });
    }

    ctx.body = 'Congrats, you have been authorized!';
  }
}

module.exports = {
  authorize,
  exchangeAccessCode
};
