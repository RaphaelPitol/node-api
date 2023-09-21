class EnderecoRepositoryMemory {
    end = [];

    async create({
        nomeEnd,
        bairro,
        numero,
        cidade,
        complemento,
        cep,
        estado,
        user_id,
    }) {
        const endereco = {
            id: Math.floor(Math.random() * 1000) + 1,
            nomeEnd,
            bairro,
            numero,
            cidade,
            complemento,
            cep,
            estado,
            user_id,
        };
        this.end.push(endereco);
        return endereco;
    }

    async index({ id }) {
        return this.end.find((ends) => ends.id === id);
    }
    async delete({ id }) {
        const t = this.end.findIndex((bd) => bd.id === id);

        this.end.splice(t);

        return;
    }

    async lista(){
        return this.end
    }
}

module.exports = EnderecoRepositoryMemory;
