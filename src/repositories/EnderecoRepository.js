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
}

module.exports = EnderecoRepository;