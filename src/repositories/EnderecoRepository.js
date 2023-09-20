const knex = require('../dataBase/knex')
const sqliteConnection = require("../dataBase/sqlite");

class EnderecoRepository{
     async create({nomeEnd, bairro, numero, cidade, complemento, cep, estado, user_id}){
          const end = await knex('endereco').insert({
               nomeEnd,
               bairro,
               numero,
               cidade,
               complemento,
               cep,
               estado,
               user_id
          })
          return end;
     }
     
     async findById(id) {
          const database = await sqliteConnection();
          const user = await database.get("SELECT * FROM users WHERE id =(?)", [
            id,
          ]);
          return user;
        }
}

module.exports = EnderecoRepository;