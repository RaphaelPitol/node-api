const EnderecoService = require("../services/EnderecoService");
const EnderecoRepository = require("../repositories/EnderecoRepository");
const UserRepository = require("../repositories/UserRepository");

class EnderecoController {
    async create(request, response) {
        const dados = request.body;
        console.log(dados.cep)
        const userRepository = new UserRepository();
        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(
            enderecoRepository,
            userRepository
        );

        await enderecoService.createEndereco({
            nomeEnd: dados.nomeEnd,
            bairro: dados.bairro,
            numero: dados.numero,
            cidade: dados.cidade,
            complemento: dados.complemento,
            cep: dados.cep,
            estado: dados.estado,
            user_id: dados.user_id,
        });

        return response.json();
    }

    async update(request, response) {
        const dados = request.body;

        const userRepository = new UserRepository();
        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(
            enderecoRepository,
            userRepository
        );

        await enderecoService.updateEnd({
            id: dados.id,
            nomeEnd: dados.nomeEnd,
            bairro: dados.bairro,
            numero: dados.numero,
            cidade: dados.cidade,
            complemento: dados.complemento,
            cep: dados.cep,
            estado: dados.estado,
            user_id: dados.user_id,
        });

        return response.json({ message: "Atualizado" });
    }

    async delete(request, response) {
        const { id } = request.params;

        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(enderecoRepository);

        await enderecoService.deleteEnd({ id });

        return response.status(201).json({ message: "Deletado com sucesso" });
    }

    async lista(request, response) {
        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(enderecoRepository);

        const list = await enderecoService.listaEnd();

        return response.json(list);
    }

    async index(request, response) {
        const { id } = request.params;

        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(enderecoRepository);

        const end = await enderecoService.endIndex({ id });

        return response.json(end);
    }
}

module.exports = EnderecoController;
