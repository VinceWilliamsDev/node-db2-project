
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.text('make', 128).notNullable()
    tbl.text('model', 128).notNullable()
    tbl.integer('year', 4).notNullable()
    tbl.decimal('price', 128).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
