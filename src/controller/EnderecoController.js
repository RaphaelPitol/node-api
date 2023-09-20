const EnderecoService = require('../services/EnderecoService')
const EnderecoRepository = require("../repositories/EnderecoRepository")


class EnderecoController{
     async create(request, response){
          const dados = request.body 

          const enderecoRepository = new EnderecoRepository()
          const enderecoService = new EnderecoService(enderecoRepository)

          try{
               await enderecoService.createEndereco({
                    nomeRua: dados.nomeRua, 
                    bairro: dados.bairro, 
                    numero: dados.numero,
                    cidade: dados.cidade, 
                    complemento: dados.complemento, 
                    cep: dados. cep, 
                    estado: dados.estado,
                    user_id: dados.user_id
               })

               return response.json()
          }catch(error){
               console.log(error)
          }

     }

}

module.exports = EnderecoController