const knex = require("../dataBase/knex");

class AvatarRepository {
  async findById({ user_id }) {
    const user = await knex("users").where({ id: user_id }).first();

    return user;
  }

  async updateAvat({ user_id, avatarFilename }) {
    const user = await knex("users").where({ id: user_id }).first();

    user.avatar = avatarFilename;

    const users = await knex("users").update(user).where({ id: user_id });

    return users;
  }
}

module.exports = AvatarRepository;
