const Knex = require('knex');
const { Model } = require('objection');

const {
  POSTGRES_HOST: host,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: database
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
});

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get idColumn() {
    return 'slack_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['slack_id'],
      properties: {
        slack_id: {type: 'string', maxLength: 255},
        google_access_token: {type: 'string', maxLength: 255},
        google_refresh_token: {type: 'string', maxLength: 255},
        google_token_expiry: {type: 'datetime'}
      }
    }
  }
}

module.exports = {
  knex,
  models: {
    User
  }
};
