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
            `(<!date^${startUnix}^{date_num}|${start}}>`,
            `<!date^${endUnix}^{date_num}|${end}>)`,
            ` *${evt.summary}*`
          ].join('')

        })
        .join('\n');
    });
  ctx.body = `Here's what's coming up on your calendar: \n${events}`;
};

module.exports = {
  listEvents
};
