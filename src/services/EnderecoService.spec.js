const EnderecoService = require('./EnderecoService')
const EnderecoRepositoryMemory = require('../repositories/EnderecoRepositoryMemory')
const AppError = require('../utils/AppError')


describe("Teste Endereco", ()=>{
     let enderecoService = null
     let enderecoRepositoryMemory = null

     beforeEach(()=>{
          enderecoRepositoryMemory = new EnderecoRepositoryMemory()
          enderecoService = new EnderecoService(enderecoRepositoryMemory)
     })

     it("Create Endereco", async()=>{

          const endereco ={
               nomeEnd: "Rua A", 
               bairro: "Ali", 
               numero: "5",
               cidade: "Carbonera", 
               complemento: "logali", 
               cep: "12345678", 
               estado: "Sp", 
               user_id: "1"
          }
          const create = await enderecoService.createEndereco(endereco)

          expect(create).toHaveProperty("id");
         
     })
     it("Verificando Cep com 8 numeros", async()=>{

          const endereco ={
               nomeEnd: "Rua A", 
               bairro: "Ali", 
               numero: "5",
               cidade: "Carbonera", 
               complemento: "logali", 
               cep: "123456", 
               estado: "Sp", 
               user_id: "1"
          }
          
          await  expect(enderecoService.createEndereco(endereco))
               .rejects.toEqual(new AppError("O cep deve ter 8 numeros!"))
     })
     it("Verificando Cep contem letras", async()=>{

          const endereco ={
               nomeEnd: "Rua A", 
               bairro: "Ali", 
               numero: "5",
               cidade: "Carbonera", 
               complemento: "logali", 
               cep: "12345p68", 
               estado: "Sp", 
               user_id: "1"
          }
          
          await  expect(enderecoService.createEndereco(endereco))
               .rejects.toEqual(new AppError("O cep deve ser somente numeros!"))
     })
     it("Verificando Campos Obrigatorios", async()=>{

          const endereco ={
               nomeEnd: "", 
               bairro: "Ali", 
               numero: "5",
               cidade: "Carbonera", 
               complemento: "logali", 
               cep: "12345p68", 
               estado: "Sp", 
               user_id: "1"
          }
          
          await  expect(enderecoService.createEndereco(endereco))
               .rejects.toEqual(new AppError("Informe os campos Obrigatorios!"))
     })
     it("Verificando se Usuario existe", async()=>{

          const endereco ={
               nomeEnd: "rua aa", 
               bairro: "Ali", 
               numero: "5",
               cidade: "Carbonera", 
               complemento: "logali", 
               cep: "12345678", 
               estado: "Sp", 
               user_id: "2000"
          }
          
          await  expect(enderecoService.createEndereco(endereco))
               .rejects.toEqual(new AppError("Usuario não encontrado!", 400))
     })
})