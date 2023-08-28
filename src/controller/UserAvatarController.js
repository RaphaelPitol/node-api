
const AvatarSession = require("../services/AvatarService");
const AvatarRepository = require("../repositories/AvatarRepository");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const avatarRepository = new AvatarRepository();
    const avatarSession = new AvatarSession(avatarRepository);

    const user = await avatarSession.updateAvatar({ user_id, avatarFilename });

    // const diskStorage = new DiskStorage();

    // const user = await knex("users").where({ id: user_id }).first();

    // if (!user) {
    //   throw new AppError(
    //     "Somente Usuários Autenticados podem mudar o Avatar",
    //     401
    //   );
    // }
    // if (user.avatar) {
    //   await diskStorage.deleteFile(user.avatar);
    // }

    // const filename = await diskStorage.saveFile(avatarFilename);
    // user.avatar = filename;

    // await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
