const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");


describe("UserCreateService", () => {

  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })

  it("user should be create", async () => {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "123",
    };
    const userCreate = await userCreateService.execute(user);

    expect(userCreate).toHaveProperty("id");
  });

  it("user not shout be created with exists email", async () => {
    const user1 = {
      name: "User Teste 1",
      email: "user@test.com",
      password: "123"
    };
    const user2 = {
      name: "User Teste2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1)

    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail ja esta em uso."));
  })

  it("Testando se Usuario Existe", async () => {

    // const users = {
    //   name: "teste",
    //   email: "teste@test.com",
    //   password: "123",
    // }

    // let user = await userCreateService.execute(users)

    const newUser = {
      id: null,
      name: "Raphae",
      email: 'teste@test.com',
      password: "1234",
      old_password: "123"
    }

    await expect(userCreateService.updateUser(newUser)).rejects.toEqual(new AppError("Usuario não encontrado"))

  })

  it('Testando o email existente no updadte', async () => {
    const user1 = {
      name: "User1",
      email: "user1@test.com",
      password: "123"
    };
    const user2 = {
      name: "User2",
      email: "user2@test.com",
      password: "123",
    
    };

    let us1 = await userCreateService.execute(user1)
    let us2 = await userCreateService.execute(user2)

    const user = {
      id: us1.id,
      email: "user2@test.com",
      password: "123",
    }
    // const newUser = await userCreateService.updateUser(user)

    await expect(userCreateService.updateUser(user))
      .rejects.toEqual(new AppError("Este email ja esta em uso."))

  });

  it('Testando se a nova senha foi informada', async() => {
    const users = {
      name: "teste",
      email: "teste@test.com",
      password: "123",
    }

    let user = await userCreateService.execute(users)

    const newUser = {
      id: user.id,
      name: "Raphae",
      email: 'teste@test.com',
      password: "",
      old_password: "123"
    }

    // const us = await userCreateService.updateUser(newUser)

    await expect(userCreateService.updateUser(newUser)).
    rejects.toEqual(new AppError("Voce precisa informar a nova senha! "))

    
  });

  it('Testando se a senha antiga foi informada', async() => {
    const users = {
      name: "teste",
      email: "teste@test.com",
      password: "123",
    }

    let user = await userCreateService.execute(users)

    const newUser = {
      id: user.id,
      name: "Raphae",
      email: 'teste@test.com',
      password: "123",
      old_password: ""
    }

    // const us = await userCreateService.updateUser(newUser)

    await expect(userCreateService.updateUser(newUser)).
    rejects.toEqual(new AppError("Voce precisa informar a senha antiga para definir a nova senha! "))

    
  });

  
  it('Testando a senha antiga esta correta', async() => {
    const users = {
      name: "teste",
      email: "teste@test.com",
      password: "123",
    }

    let user = await userCreateService.execute(users)

    const newUser = {
      id: user.id,
      name: "Raphae",
      email: 'teste@test.com',
      password: "123",
      old_password: "1"
    }

    // const us = await userCreateService.updateUser(newUser)

    await expect(userCreateService.updateUser(newUser)).
    rejects.toEqual(new AppError("A senha antiga não confere!"))

    
  });

  it('Testando a senhas são iguais', async() => {
    const users = {
      name: "teste",
      email: "teste@test.com",
      password: "123",
    }

    let user = await userCreateService.execute(users)

    const newUser = {
      id: user.id,
      name: "Raphae",
      email: 'teste@test.com',
      password: "123",
      old_password: "123"
    }

    // const us = await userCreateService.updateUser(newUser)

    await expect(userCreateService.updateUser(newUser)).
    rejects.toEqual(new AppError("As senha nova deve ser diferente da Antiga"))

    
  });
  
  


  it("2 + 2 = 4 ", () => {
    let a = 2;
    let b = 2;

    let sum = a + b;

    expect(sum).toEqual(4)

  })

})
