
class CarsRepositoryMemory{
     cars = [];

     async create({nome, marca, ano_fabricacao}){
          const car ={
               id: Math.floor(Math.random()*1000) + 1,
               nome,
               marca,
               ano_fabricacao
          }
          this.cars.push(car);

          return car;
     }
     async lista(){
          const list = await this.cars

          return list
     }
}
module.exports = CarsRepositoryMemory
