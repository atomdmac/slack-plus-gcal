exports.up = function(knex) {
  return knex.schema
    .createTable('Users', (table) => {
      table.string('slack_id', 255).notNullable().unique();
      table.string('google_token', 255).notNullable();
    })
};

exports.down = function(knex) {
  return knex.dropTable('Users');
};
