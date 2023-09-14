const {Router} = require('express')
const CarsController = require('../controller/CarsController')
const ensureAutenticated = require("../middlewar/ensureAutenticated");


const carsRoutes = Router()

const carsController = new CarsController()

carsRoutes.post('/',ensureAutenticated,carsController.create)
carsRoutes.put('/', ensureAutenticated, carsController.update)
carsRoutes.get('/',ensureAutenticated,carsController.lista)
carsRoutes.delete('/:id',ensureAutenticated,carsController.delete)


module.exports = carsRoutes