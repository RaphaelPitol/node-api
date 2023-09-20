const sqliteConnection = require("../dataBase/sqlite");
class EnderecoRepositoryMemory{

     end=[];

     async create({nomeEnd, bairro, numero, cidade, complemento, cep, estado, user_id}){
          const endereco = {
               id: Math.floor(Math.random()*1000) + 1,
               nomeEnd,
               bairro,
               numero,
               cidade,
               complemento,
               cep,
               estado,
               user_id
          }
          this.end.push(endereco)
          return endereco;
     }

     async findById(id) {
          const database = await sqliteConnection();
          const user = await database.get("SELECT * FROM users WHERE id =(?)", [
            id,
          ]);
          return user;
        }

}

module.exports = EnderecoRepositoryMemory
