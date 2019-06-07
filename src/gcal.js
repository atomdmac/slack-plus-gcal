const {google} = require('googleapis');

const addEvent = async (auth, text) => {
  const calendar = google.calendar({version: 'v3', auth});
  return await calendar.events.quickAdd({
    calendarId: 'primary',
    text
  });

}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listEvents = async (auth) => {
  const calendar = google.calendar({version: 'v3', auth});
  return await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
    .then(response => response.data.items);
}

module.exports = {
  addEvent,
  listEvents
};
