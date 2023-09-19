

class EnderecoService{
     constructor(enderecoRepository){
          this.enderecoRepository = enderecoRepository
     }

     async createEndereco({nomeRua, bairro, numero, complemento, cep, estado, user_id}){

          console.log({nomeRua})
          const newEnd = await this.enderecoRepository.create({
               nomeRua, 
               bairro, 
               numero, 
               complemento, 
               cep, 
               estado, 
               user_id
          })

          return newEnd

     }
}
module.exports = EnderecoService