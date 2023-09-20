

const AppError = require("../utils/AppError");
const { response } = require("express");


class EnderecoService {
     constructor(enderecoRepository, userRepository){
          this.enderecoRepository = enderecoRepository
          this.userRepository = userRepository
          
     }

     async createEndereco({nomeEnd, bairro, numero, cidade, complemento, cep, estado, user_id}){

          if(!nomeEnd || !bairro || !numero || !cidade || !cep ||  !user_id){
               // throw new Error('teste rapha')
               throw new AppError("Informe os campos Obrigatorios!")
          }
          if(estado.length !== 2){
               throw new AppError("Deve informar somente a Sigla com duas letras do estado")
          }

          if(cep.length !== 8){
               throw new AppError("O cep deve ter 8 numeros!", 400)
          }
          if(isNaN(cep)){
               throw new AppError("O cep deve ser somente numeros!", 400)
          }
         
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
               user_id
          })

          return newEnd

     }

     async deleteEnd({ id }) {
          await this.enderecoRepository.delete({ id });
          return 200;
        }
}
module.exports = EnderecoService