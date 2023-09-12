
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });
    return response.status(201).json();
  }

  async update(request, response) {
    const userData = request.body
    const user = request.user.id

   
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.updateUser({
      id: user,
      old_password: userData.old_password,
      password: userData.password,
      name: userData.name,
      email: userData.email
    });

    return response.status(200).json();
  }
  async list(request, response){
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    
    const users = await userCreateService.lista()

    return response.json(users)

  }
}

module.exports = UsersController;
