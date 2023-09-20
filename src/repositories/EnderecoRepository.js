const knex = require('../dataBase/knex')

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

     async delete({ id }) {
          await knex("endereco").where({ id }).delete();
      
          return;
        }

     async lista() {
          const list = await knex("endereco")
            .join("users", "endereco.user_id", "=", "users.id")
            .select(
              "endereco.id",
              "endereco.nomeEnd",
              "endereco.bairro",
              "endereco.numero",
              "endereco.cidade",
              "endereco.complemento",
              "endereco.cep",
              "endereco.estado",
              "users.name"
            );
      
          return list;
        }
}

module.exports = EnderecoRepository;