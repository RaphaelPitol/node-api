const AppError = require("../utils/AppError");



class EnderecoService {
    constructor(enderecoRepository, userRepository) {
        this.enderecoRepository = enderecoRepository;
        this.userRepository = userRepository;
    }

    async createEndereco({
        nomeEnd,
        bairro,
        numero,
        cidade,
        complemento,
        cep,
        estado,
        user_id,
    }) {
        // if (!nomeEnd || !bairro || !numero || !cidade || !cep || !user_id) {
        //     // throw new Error('teste rapha')
        //     throw new AppError("Informe os campos Obrigatorios!");
        // }
        // if (estado.length !== 2) {
        //     throw new AppError(
        //         "Deve informar somente a Sigla com duas letras do estado"
        //     );
        // }

        // let length = cep.toString().length;

        // if (length !== 8) {
        //     throw new AppError("O cep deve ter 8 numeros!", 400);
        // }
        // if (isNaN(cep)) {
        //     throw new AppError("O cep deve ser somente numeros!", 400);
        // }
        const userExists = await this.userRepository.findById(user_id);
        if (!userExists) {
            throw new AppError("Usuario não encontrado!");
        }

        const newEnd = await this.enderecoRepository.create({
            nomeEnd,
            bairro,
            numero,
            cidade,
            complemento,
            cep,
            estado,
            user_id,
        });

        return newEnd;
    }

    async updateEnd({
        id,
        nomeEnd,
        bairro,
        numero,
        cidade,
        complemento,
        cep,
        estado,
        user_id,
    }) {
        const idEnd = await this.enderecoRepository.index({ id });
        if (!idEnd) {
            throw new AppError("Endereço não encontrado!");
        }

        // if (!nomeEnd || !bairro || !numero || !cidade || !cep || !user_id) {
        //     throw new AppError("Informe os campos Obrigatorios!");
        // }
        // if (estado.length !== 2) {
        //     throw new AppError(
        //         "Deve informar somente a Sigla com duas letras do estado"
        //     );
        // }

        // if (cep.length !== 8) {
        //     throw new AppError("O cep deve ter 8 numeros!", 400);
        // }
        // if (isNaN(cep)) {
        //     throw new AppError("O cep deve ser somente numeros!", 400);
        // }

        const userExists = await this.userRepository.findById(user_id);
        if (!userExists) {
            throw new AppError("Usuario não encontrado!");
        }

        const upEnd = await this.enderecoRepository.update({
            id,
            nomeEnd,
            bairro,
            numero,
            cidade,
            complemento,
            cep,
            estado,
            user_id,
        });

        return upEnd;
    }

    async deleteEnd({ id }) {
        const idEnd = await this.enderecoRepository.index({ id });
        if (!idEnd) {
            throw new AppError("Endereço não encontrado!");
        }
        await this.enderecoRepository.delete({ id });
    }

    async listaEnd({page, limit}) {
        const list = await this.enderecoRepository.lista({page, limit});

        return list;
    }

    async endIndex({ id }) {
        const end = await this.enderecoRepository.index({ id });
        if (!end) {
            throw new AppError("Endereço não encontrado!");
        }

        return end;
    }

    async busca({nomeEnd, bairro, numero, cidade, cep, estado, nome}){

        console.log(nomeEnd, bairro, numero, cidade, cep, estado, nome)
        const n = await this.enderecoRepository.buscaPorLetra({
            nomeEnd: nomeEnd ? nomeEnd : "",
            bairro: bairro ? bairro : "",
            numero: numero ? numero : "",
            cidade: cidade ? cidade : "",
            cep: cep ? cep : "",
            estado: estado ? estado : "",
            nome: nome ? nome : ""})
        console.log("teste")
        console.log(n)

        return n;
    }
}
module.exports = EnderecoService;
