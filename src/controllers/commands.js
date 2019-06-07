const gcal = require('../gcal');

const listEvents = async (ctx) => {
  const events = await gcal.listEvents(ctx.googleOAuth2Client)
    .then(results => {
      return results
        .map(evt => {
          const start = new Date(evt.start.dateTime);
          const startUnix = start.getTime() / 1000;
          const end = new Date(evt.end.dateTime);
          const endUnix = end.getTime() / 1000;
          return [
            ` ▶ `,
            `(<!date^${startUnix}^{date_num}|${start}>`,
            `<!date^${endUnix}^{date_num}|${end}>)`,
            ` *${evt.summary}*`
          ].join('')

        })
        .join('\n');
    });
  ctx.body = `Here's what's coming up on your calendar: \n${events}`;
};

const addEvent = async (ctx) => {
  const text = ctx.request.body.text;
  if (!text) {
    ctx.body = 'You need to provide info about your event (ex. Do stuff at 10pm tomorrow")';
  }
  await gcal.addEvent(ctx.googleOAuth2Client, text)
    .then((results) => {
      const start = new Date(results.data.start.dateTime);
      const startUnix = start.getTime() / 1000;
      ctx.body = [
        `An event has been created at`,
        ` <!date^${startUnix}^{date_num} at {time}|${start}>`
      ].join('');
    });
}

module.exports = {
  addEvent,
  listEvents
};
