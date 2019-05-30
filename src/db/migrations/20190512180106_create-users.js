exports.up = function(knex) {
  return knex.schema
    .createTable('Users', (table) => {
      table.string('slack_id', 255).notNullable().unique();
      table.string('google_access_token', 255);
      table.string('google_refresh_token', 255);
      table.datetime('google_token_expiry');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Users');
};
