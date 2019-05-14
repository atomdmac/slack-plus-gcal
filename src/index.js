const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'OK neat it works';
});

router.get('/secret', (ctx, next) => {
  ctx.body = 'You found my secret route!';
});

app.use(router.routes(), router.allowedMethods());

app.listen(3000);
