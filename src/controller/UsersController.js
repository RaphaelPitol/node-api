/* 
index-  Get para listar varios registros
show- GET para exibir um registro especifico.
create - POST para criar um registro.
update- PUT para atualizar um registro.
delete - DELETE para remover um regitro.

*/
const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConenection = require("../dataBase/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConenection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email =(?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail ja esta em uso");
    }
    const hashedPassword = await hash(password, 8);
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConenection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("Usuario não encontrado");
    }
    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso.");
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Voce precisa informar a senha antiga para definir a nova senha! "
      );
    }
    

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere!");
      }
      if (password === old_password) {
        throw new AppError("As senha nova deve ser diferente da Antiga");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updaded_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
