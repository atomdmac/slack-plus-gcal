const Router = require('koa-router');

const authGoogle = require('./controllers/auth-google');
const commands = require('./controllers/commands');
const debug = require('./controllers/debug');

const authGoogleRouter = new Router({
  prefix: '/auth-google'
});
authGoogleRouter.get('/code', authGoogle.exchangeAccessCode());

const commandsRouter = new Router({
  prefix: '/commands'
});
commandsRouter.use(authGoogle.authorize())
commandsRouter.post('/events/list', commands.listEvents);

const debugRouter = new Router({
  prefix: '/debug'
});

debugRouter.get('/ping', debug.ping);
debugRouter.get('/users', debug.getUsers);

module.exports = {
  authGoogleRouter,
  commandsRouter,
  debugRouter
}
