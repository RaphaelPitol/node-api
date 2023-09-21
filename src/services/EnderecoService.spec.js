const EnderecoService = require("./EnderecoService");
const UserCreateService = require("./UserCreateService");
const EnderecoRepositoryMemory = require("../repositories/EnderecoRepositoryMemory");
const UserRepositoryMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("Teste Endereco", () => {
    let enderecoService = null;
    let enderecoRepositoryMemory = null;
    let userRepositoryMemory = null;
    let userService = null;

    beforeEach(() => {
        userRepositoryMemory = new UserRepositoryMemory();
        enderecoRepositoryMemory = new EnderecoRepositoryMemory();
        userService = new UserCreateService(userRepositoryMemory);
        enderecoService = new EnderecoService(
            enderecoRepositoryMemory,
            userRepositoryMemory
        );
    });

    it("Create Endereco", async () => {
        let user = {
            name: "User test",
            email: "user@test.com",
            password: "123",
        };
        let us = await userService.execute(user);
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "12345678",
            estado: "Sp",
            user_id: us.id,
        };
        const create = await enderecoService.createEndereco(endereco);

        expect(create).toHaveProperty("id");
    });
    it("Verificando Cep com 8 numeros", async () => {
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "123456",
            estado: "Sp",
            user_id: "1",
        };

        await expect(enderecoService.createEndereco(endereco)).rejects.toEqual(
            new AppError("O cep deve ter 8 numeros!")
        );
    });
    it("Verificando a Sigla do estado com 2 letras", async () => {
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "123456",
            estado: "sps",
            user_id: "1",
        };

        await expect(enderecoService.createEndereco(endereco)).rejects.toEqual(
            new AppError("Deve informar somente a Sigla com duas letras do estado")
        );
    });
    it("Verificando Cep contem letras", async () => {
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "12345p68",
            estado: "Sp",
            user_id: "1",
        };

        await expect(enderecoService.createEndereco(endereco)).rejects.toEqual(
            new AppError("O cep deve ser somente numeros!")
        );
    });
    it("Verificando Campos Obrigatorios", async () => {
        const endereco = {
            nomeEnd: "",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "12345p68",
            estado: "Sp",
            user_id: "1",
        };

        await expect(enderecoService.createEndereco(endereco)).rejects.toEqual(
            new AppError("Informe os campos Obrigatorios!")
        );
    });

    it("testando Delete", async () => {
        let user = {
            name: "User test",
            email: "user@test.com",
            password: "123",
        };
        let us = await userService.execute(user);
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "12345678",
            estado: "Sp",
            user_id: us.id,
        };
        const end = await enderecoService.createEndereco(endereco);
        expect(await enderecoService.deleteEnd({ id: end.id })).resolves;
    });
    it("testando Delete com Id inexistente", async () => {
        let user = {
            name: "User test",
            email: "user@test.com",
            password: "123",
        };
        let us = await userService.execute(user);
        const endereco = {
            nomeEnd: "Rua A",
            bairro: "Ali",
            numero: "5",
            cidade: "Carbonera",
            complemento: "logali",
            cep: "12345678",
            estado: "Sp",
            user_id: us.id,
        };
        const end = await enderecoService.createEndereco(endereco);
        let idTest = 10;
        await expect(enderecoService.deleteEnd( {id: idTest })).rejects.toEqual(
            new AppError("Endereço não encontrado!")
        );
    });
});
