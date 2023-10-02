const EnderecoService = require("../services/EnderecoService");
const EnderecoRepository = require("../repositories/EnderecoRepository");
const UserRepository = require("../repositories/UserRepository");
const { z, number } = require("zod");

const shechemEnd = z.object({
    nomeEnd: z.string().nonempty({ message: "Informe o endereço!" }),
    bairro: z.string().nonempty({ message: "Informe o bairro!" }),

    numero: z
        .union([z.number(), z.string()])
        .transform((value) => {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return parseInt(value, 10);
            }
            return value;
        })
        .refine((value) => typeof value === "number", {
            message: "O número deve ser um valor numérico!",
        })
        .refine((val) => val > 0, {
            message: "Informe um número válido",
        }),

    cidade: z.string().nonempty({ message: "Adicione uma cidade!" }),
    complemento: z.string().optional(),

    cep: z
        .string()
        .length(8, { message: "O cep deve ter 8 números!" })
        .regex(/^\d{8}$/, { message: "O cep deve conter apenas números" }),

    estado: z
        .string()
        .length(2, { message: "Insira com duas letras a sigla!" })
        .nonempty({ message: "Informe o Estado" })
        .refine((value) => !/\d/.test(value), {
            message: "A sigla do estado não pode conter números",
        }),

    user_id: z
        .union([z.number(), z.string()])
        .transform((value) => {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return parseInt(value, 10);
            }
            return value;
        })
        .refine((value) => typeof value === "number", {
            message: "Informe o Usuario!",
        })
        .refine((val) => val > 0, {
            message: "Informe o Usuario!",
        }),
});

const schemaId = z
    .union([z.number(), z.string()])
    .transform((value) => {
        if (typeof value === "string" && /^\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        return value;
    })
    .refine((value) => typeof value === "number", {
        message: "Informe um Endereço valido!",
    })
    .refine((val) => val > 0, {
        message: "Informe um Endereço valido!",
    });

class EnderecoController {
    async create(request, response) {
        const dados = request.body;
        console.log(dados);
        console.log("========");

        const valiSchema = shechemEnd.safeParse(dados);

        if (!valiSchema.success) {
            return response
                .status(400)
                .json({ message: valiSchema.error.formErrors.fieldErrors });
        } else {
            console.log(valiSchema.data);
        }
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

        return response.json("Sucesss");
    }

    async update(request, response) {
        const dados = request.body;

        const valiSchema = shechemEnd.safeParse(dados);

        if (!valiSchema.success) {
            return response
                .status(400)
                .json({ message: valiSchema.error.formErrors.fieldErrors });
        } else {
            console.log(valiSchema.data);
        }
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

        const valiSchema = schemaId.safeParse(id);

        if (!valiSchema.success) {
            return response
            .status(400)
            .json({ message: valiSchema.error.issues});
        } else {
            console.log(valiSchema.data);
        }

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

        const valiSchema = schemaId.safeParse(id);

        if (!valiSchema.success) {
            return response
            .status(400)
            .json({ message: valiSchema.error.issues});
        } else {
            console.log(valiSchema.data);
        }

        const enderecoRepository = new EnderecoRepository();
        const enderecoService = new EnderecoService(enderecoRepository);

        const end = await enderecoService.endIndex({ id });

        return response.json(end);
    }
}

module.exports = EnderecoController;
