const knex = require("../dataBase/knex")

class SessionsRepository{
     
     async findByEmail(email){
          const user = await knex("users").where( email ).first();

          return user;
     }

}
module.exports = SessionsRepository