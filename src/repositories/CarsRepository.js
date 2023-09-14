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
    const list = await knex("cars")
      .join("users", "cars.user_id", "=", "users.id")
      .select(
        "cars.id",
        "cars.nome",
        "cars.marca",
        "cars.ano_fabricacao",
        "users.name"
      );

    return list;
  }

  async delete({ id }) {
    await knex("cars").where({ id }).delete();

    return;
  }

  async update({ id, nome, marca, ano_fabricacao, user_id }) {
    const updadeCars = await knex("cars").where("id", "=", id).update({
      nome,
      marca, 
      ano_fabricacao,
      user_id
    });
    return updadeCars;
  }
}
module.exports = CarsRepository;
