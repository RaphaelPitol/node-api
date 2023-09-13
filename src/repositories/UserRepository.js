const sqliteConnection = require("../dataBase/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email =(?)", [
      email,
    ]);

    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return { id: userId };
  }

  
  async findById(id) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id =(?)", [
      id,
    ]);
    return user;
  }
  async update({id, name, email, password }) {
    const database = await sqliteConnection();
    const user = await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updaded_at = DATETIME('now')
      WHERE id = ?`,
      [name, email, password, id]
    );
    
    return {id:user};
  }
  async updateNotPassword({id, name, email}) {
    const database = await sqliteConnection();
    const user = await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      updaded_at = DATETIME('now')
      WHERE id = ?`,
      [name, email, id]
    );
    
    return {id:user};
  }

  async listUser(){
    const database = await sqliteConnection()
    const users = await database.all("SELECT name, id FROM users")

    return users
  }
}
module.exports = UserRepository;
