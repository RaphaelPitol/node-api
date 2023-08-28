const knex = require("../dataBase/knex")

class TagsRepository{

     async index({user_id}){
          const tags = await knex("tags")
          .where({user_id})
          .groupBy("name")

          return tags;
     }


}
module.exports = TagsRepository