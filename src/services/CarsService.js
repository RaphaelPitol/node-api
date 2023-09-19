const AppError = require("../utils/AppError");

class CarsService {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async createCars({ nome, marca, ano_fabricacao, user_id }) {
    if (!nome || !marca || !ano_fabricacao) {
      throw new AppError("Informar todos os dados!");
    }
    const newCar = await this.carsRepository.create({
      nome,
      marca,
      ano_fabricacao,
      user_id,
    });

    return newCar;
  }

  async listaCars() {
    const list = await this.carsRepository.lista();

    return list;
  }

  async deleteCar({ id }) {
    await this.carsRepository.delete({ id });

    return;
  }

  async updadeCar({id, nome, marca, ano_fabricacao, user_id}){
    const upCars = await this.carsRepository.update({
      id,
      nome,
      marca,
      ano_fabricacao,
      user_id
    })
    return upCars;
  }

  async carIndex({id}){
    
    const car = await this.carsRepository.index({id})

    return car;
  }
}
module.exports = CarsService;
