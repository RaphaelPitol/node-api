const knex = require("../dataBase/knex");

class EnderecoRepository {
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
        const end = await knex("endereco").insert({
            nomeEnd,
            bairro,
            numero,
            cidade,
            complemento,
            cep,
            estado,
            user_id,
        });
        return end;
    }
    async update({
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
        const updateEnd = await knex("endereco").where("id", "=", id).update({
            nomeEnd,
            bairro,
            numero,
            cidade,
            complemento,
            cep,
            estado,
            user_id,
        });

        return updateEnd;
    }

    async delete({ id }) {
        await knex("endereco").where({ id }).delete();

        return;
    }

    async lista(page) {
        console.log("$$$$$$", page);
        const list = await knex("endereco")
            .join("users", "endereco.user_id", "=", "users.id")
            .select(
                "endereco.id",
                "endereco.nomeEnd",
                "endereco.bairro",
                "endereco.numero",
                "endereco.cidade",
                "endereco.complemento",
                "endereco.cep",
                "endereco.estado",
                "users.name"
            )
            .orderBy("endereco.id", "asc")
            .limit(5)
            .offset(page);

        console.log(list);
        const tmp = await knex("endereco").count("*").first();

        console.log("uuuuuuu",tmp);

        const rowCount = tmp[`count(*)`];


        return { list, rowCount };
    }
    async index({ id }) {
        const endIndex = await knex("endereco")
            .select("*")
            .where({ id })
            .first();

        return endIndex;
    }

    async buscaPorLetra({
        nomeEnd,
        bairro,
        numero,
        cidade,
        cep,
        estado,
        nome,
        page,
    }) {
        console.log("testeeee");
        console.log(nomeEnd, bairro, numero, cidade, cep, estado, nome);
        const busca = await knex("endereco")
            .join("users", "endereco.user_id", "=", "users.id")
            .select(
                "endereco.id",
                "endereco.nomeEnd",
                "endereco.bairro",
                "endereco.numero",
                "endereco.cidade",
                "endereco.complemento",
                "endereco.cep",
                "endereco.estado",
                "users.name"
            )
            .whereLike("nomeEnd", `%${nomeEnd}%`)
            .whereLike("bairro", `%${bairro}%`)
            .whereLike("numero", `%${numero}%`)
            .whereLike("cidade", `%${cidade}%`)
            .whereLike("cep", `%${cep}%`)
            .whereLike("estado", `%${estado}%`)
            .whereLike("users.name", `%${nome}%`)
            .orderBy("endereco.id", "asc")
            .offset(page * 5)
            .limit(5);

        return busca;
    }
}

module.exports = EnderecoRepository;
