exports.up = knex => knex.schema.createTable("endereco", table =>{
     table.increments("id");
     table.text("nomeRua");
     table.text("bairro");
     table.text("numero");
     table.text("complemento");
     table.text("cep");
     table.text("estado");
     table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("endereco")