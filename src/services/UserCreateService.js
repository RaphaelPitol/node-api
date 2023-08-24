const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { charset } = require("mime-types");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  //função para criar usuario
  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Este e-mail ja esta em uso.");
    }

    const hashedPassword = await hash(password, 8);
    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }

  //função para atualizar os dados do usuario
  async updateUser({ id, name, email, old_password, password }) {
    const user = await this.userRepository.findById(id);
    const userEmail = await this.userRepository.findByEmail(email);

    const checkEmail = userEmail ? userEmail.email : null;
    console.log(password);

    if (!user.id) {
      throw new AppError("Usuario não encontrado");
    }

    if (!checkEmail) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
    } else if (email && userEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso.");
    }

    if (password && !old_password) {
      throw new AppError(
        "Voce precisa informar a senha antiga para definir a nova senha! "
      );
    }
    if (!password && old_password) {
      throw new AppError("Voce precisa informar a nova senha! ");
    }

    if (user.password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere!");
      }
      if (password === old_password) {
        throw new AppError("As senha nova deve ser diferente da Antiga");
      }
    }

    if (!password || !old_password) {
      const userUpdateNotPassword = await this.userRepository.updateNotPassword(
        {
          id,
          name,
          email,
        }
      );
      return userUpdateNotPassword;
    }

    const hashedPassword = await hash(password, 8);
   
    const userUpdate = await this.userRepository.update({
      id,
      name,
      email,
      password: hashedPassword,
    });

    return userUpdate;
  }
}

module.exports = UserCreateService;
