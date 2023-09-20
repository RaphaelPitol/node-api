const AppError = require("../utils/AppError")


class EnderecoService{
     constructor(enderecoRepository){
          this.enderecoRepository = enderecoRepository
     }

     async createEndereco({nomeRua, bairro, numero, cidade, complemento, cep, estado, user_id}){

          if(!nomeRua || !bairro || !numero || !cidade || !cep ||  !user_id){
               throw new AppError("Informe os campos Obrigatorios!")
          }
          
          if(cep.length !== 8){
               throw new AppError("O cep deve ter 8 numeros!")
          }
          if(isNaN(cep)){
               throw new AppError("O cep deve ser somente numeros!")
          }
          const newEnd = await this.enderecoRepository.create({
               nomeRua, 
               bairro, 
               numero,
               cidade, 
               complemento, 
               cep, 
               estado, 
               user_id
          })

          return newEnd

     }
}
module.exports = EnderecoService