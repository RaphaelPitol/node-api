const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

const diskStorage = new DiskStorage();

class AvatarService {
  constructor(avatarRepository) {
    this.avatarRepository = avatarRepository;
  }

  async updateAvatar({ user_id, avatarFilename }) {
    const user = await this.avatarRepository.findById({ user_id });

    if (!user.id) {
      throw new AppError(
        "Somente Usuários Autenticados podem mudar o Avatar",
        401
      );
    }
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    console.log(filename);
    user.avatar = filename;

    await this.avatarRepository.updateAvat({
      user_id: user.id,
      avatarFilename,
    });

    return user;
  }
}
module.exports = AvatarService;
