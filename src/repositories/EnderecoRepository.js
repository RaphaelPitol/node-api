const knex = require('../dataBase/knex')

class EnderecoRepository{
     async create({nomeRua, bairro, numero, cidade, complemento, cep, estado, user_id}){
          const end = await knex('endereco').insert({
               nomeRua,
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
}

module.exports = EnderecoRepository;