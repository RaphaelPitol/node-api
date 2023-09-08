const CarService = require ("./CarsService")
const CarsRepositoryMemory = require('../repositories/CarsRepositoryMemory')
const AppError = require("../utils/AppError");

describe("Create Car", ()=>{
     let carRepositoryMemory = null
     let carService = null

     beforeEach(()=>{
          carRepositoryMemory = new CarsRepositoryMemory()
          carService = new CarService(carRepositoryMemory)
     })

     it("Create Cars", async()=>{
          const cars = {
               nome: "Carro",
               marca: "fiat",
               ano_fabricacao:"1999",

          }
          const createCar = await carService.createCars(cars)

          expect(createCar).toHaveProperty("id");
     })
     it("Campo vazio", async()=>{
          const cars = {
               nome: "Carro",
               marca:null, 
               ano_fabricacao:"1999"

          }
         await expect(carService.createCars(cars)).rejects.toEqual(new AppError("Informar todos os dados!"))
     })

     it("Retorna lista", async()=>{
          const car1 = {
               nome: "Carro",
               marca: "fiat",
               ano_fabricacao:"1999"

          }
          const car2 = {
               nome: "Carro",
               marca: "fiat",
               ano_fabricacao:"1998"

          }
          const arrCars =[
               car1,
               car2
          ]
          const createCar = await carService.createCars(car1)
          const createCars = await carService.createCars(car2)

          console.log(createCars)
          const list = await carService.listaCars()
          console.log(list)
          console.log(arrCars)
        
          expect(list.length).toEqual(arrCars.length)
     })
})