const Knex = require('knex');
const { Model } = require('objection');

const {
  POSTGRES_HOST: host,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password
} = process.env;

const knex = Knex({
  client: 'pg',
  useNullAsDefault: false,
  connection: {
    host,
    user,
    password,
    database
  }
})

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'User'
  }

  async function createSchema() {
    if (await knex.schema.hasTable(User.tableName)) {
      return;
    }

    await knex.schema.createTable(User.tableName, callback)
  }
}

module.exports = {
  knex,
  models: {
    User
  }
};
