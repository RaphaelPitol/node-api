exports.up = knex => knex.schema.createTable("cars", table =>{
     table.increments("id");
     table.text("nome");
     table.text("marca");
     table.date("ano_fabricacao");
     table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("cars")