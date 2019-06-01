const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const authGoogle = require('./auth-google');
const db = require('./db');

const app = new Koa();

const authGoogleRouter = new Router({
  prefix: '/auth-google'
});
authGoogleRouter.get('/code', authGoogle.exchangeAccessCode());

const commandsRouter = new Router({
  prefix: '/commands'
});
commandsRouter.use(authGoogle.authorize())
commandsRouter.post('/list-events', async (ctx) => {
  const events = await authGoogle.listEvents(ctx.googleOAuth2Client)
    .then(results => {
      return results
        .map(evt => {
          const start = new Date(evt.start.dateTime);
          const startUnix = start.getTime() / 1000;
          const end = new Date(evt.end.dateTime);
          const endUnix = end.getTime() / 1000;
          return [
            ` - `,
            `(<!date^${startUnix}^{date_num}|${start}}>`,
            `- <!date^${endUnix}^{date_num}|${end}>)`,
            `*${evt.summary}*`
          ].join('')

        })
        .join('\n');
    });
  ctx.body = `Here's what's coming up on your calendar: \n${events}`;
});

const debugRouter = new Router({
  prefix: '/debug'
});
debugRouter.get('/ping', (ctx) => {
  ctx.body = 'PONG!';
});
debugRouter.get('/users', async (ctx) => {
  const users = await db.models.User
    .query()
    .then(results => results.map(result => result.slack_id))

  ctx.body = JSON.stringify(users);
})

app.use(bodyParser());
app.use(authGoogleRouter.routes(), authGoogleRouter.allowedMethods());
app.use(commandsRouter.routes(), commandsRouter.allowedMethods());
app.use(debugRouter.routes(), debugRouter.allowedMethods());

app.listen(3000);
