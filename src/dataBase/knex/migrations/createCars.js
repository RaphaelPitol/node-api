exports.up = knex => knex.schema.createTable("cars", table =>{
     table.increments("id");
     table.text("nome");
     table.text("marca");
     table.date("ano_fabricacao");
});

exports.down = knex => knex.schema.dropTable("cars")