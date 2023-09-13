const AppError = require("../utils/AppError");

class CarsService {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async createCars({ nome, marca, ano_fabricacao, user_id }) {
    if (!nome || !marca || !ano_fabricacao) {
      throw new AppError("Informar todos os dados!");
    }
    console.log(nome);
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
}
module.exports = CarsService;