const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {
  authGoogleRouter,
  commandsRouter,
  debugRouter
} = require('./routes');

const app = new Koa();

app.use(bodyParser());
app.use(authGoogleRouter.routes(), authGoogleRouter.allowedMethods());
app.use(commandsRouter.routes(), commandsRouter.allowedMethods());
app.use(debugRouter.routes(), debugRouter.allowedMethods());

app.listen(3000);
