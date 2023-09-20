
class EnderecoRepositoryMemory{

     end=[];

     async create({nomeRua, bairro, numero, cidade, complemento, cep, estado, user_id}){
          const endereco = {
               id: Math.floor(Math.random()*1000) + 1,
               nomeRua,
               bairro,
               numero,
               cidade,
               complemento,
               cep,
               estado,
               user_id
          }
          this.end.push(endereco)
          return endereco;
     }

}

module.exports = EnderecoRepositoryMemory
