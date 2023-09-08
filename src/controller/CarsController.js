const CarsService = require("../services/CarsService");
const CarsRepository = require("../repositories/CarsRepository")

class CarsController {
     async create(request, response) {
          const dados = request.body
          const id = request.user.id
          console.log(id)
          const carsRepository = new CarsRepository()
          const carsService = new CarsService(carsRepository)

          await carsService.createCars({
               nome: dados.nome,
               marca: dados.marca,
               ano_fabricacao: dados.ano_fabricacao,
               user_id: id
               
          })
          return response.json()
     }

     async lista(request, response){
          
          const carsRepository = new CarsRepository()
          const carsService = new CarsService(carsRepository)

          
            const t = await carsService.listaCars()
            

          return response.json(t)
     }

}

module.exports = CarsController