require('dotenv').config({
  path: './bot.env'
});

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URIS
} = process.env;

module.exports = {
  google: {
    credentials: {
      installed: {
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        project_id: '',
        redirect_uris: [
          GOOGLE_REDIRECT_URIS
        ],
        token_uri: 'https://oauth2.googleapis.com/token'
      }
    }
  }
}
