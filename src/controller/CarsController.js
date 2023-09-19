const CarsService = require("../services/CarsService");
const CarsRepository = require("../repositories/CarsRepository");

class CarsController {
  async create(request, response) {
    const dados = request.body;
    const carsRepository = new CarsRepository();
    const carsService = new CarsService(carsRepository);

    await carsService.createCars({
      nome: dados.nome,
      marca: dados.marca,
      ano_fabricacao: dados.ano_fabricacao,
      user_id: dados.user_id,
    });
    return response.json();
  }

  async lista(request, response) {
    const carsRepository = new CarsRepository();
    const carsService = new CarsService(carsRepository);

    const list = await carsService.listaCars();

    return response.json(list);
  }

  async delete(request, response) {
    const { id } = request.params;
    const carsRepository = new CarsRepository();
    const carsService = new CarsService(carsRepository);

    await carsService.deleteCar({ id });

    return response.json();
  }

  async update(request, response) {
    const { id, nome, marca, ano_fabricacao, user_id } = request.body;

    const carsRepository = new CarsRepository();
    const carsService = new CarsService(carsRepository);

    await carsService.updadeCar({ id, nome, marca, ano_fabricacao, user_id });

    return response.json();
  }

  async index(request, response) {
    const { id } = request.params;
   
    const carsRepository = new CarsRepository();
    const carsService = new CarsService(carsRepository);

    const ind = await carsService.carIndex( {id} );
    

    return response.json(ind);
  }
}

module.exports = CarsController;
