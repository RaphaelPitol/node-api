const knex = require("../dataBase/knex");

class CarsRepository {
  async create({ nome, marca, ano_fabricacao, user_id }) {
    const cars = await knex("cars").insert({
      nome,
      marca,
      ano_fabricacao,
      user_id,
    });

    return cars;
  }

  async lista() {
    // const list = await knex("*").from("cars")
    // try{
    //      // const list = await knex.from("cars")
    //      //      .innerJoin("users","cars.user_id","=", "users.id")
    //           // console.log(list)
    //           // list.map(cars=>{
    //           //      console.log(cars.nome)
    //           //      console.log(cars.name)
    //           // })
    const list = await knex("cars")
      .join("users", "cars.user_id", "=", "users.id")
      .select("cars.id", "cars.nome", "cars.marca", "cars.ano_fabricacao", "users.name");

    return list;
    // }catch(error){
    //      console.log(error)
  }

  async delete({ id }) {
    await knex("cars").where({ id }).delete();

    return;
  }
}
module.exports = CarsRepository;
