const {
  models: {
    User
  }
} = require('../db');

const getUsers = async (ctx) => {
  const users = await User
    .query()
    .then(results => results.map(result => result.slack_id))

  ctx.body = JSON.stringify(users);
};

const ping = (ctx) => {
  ctx.body = 'PONG!';
};

module.exports = {
  getUsers,
  ping
}
