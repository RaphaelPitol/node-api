const {Router} = require('express')
const EnderecoController = require('../controller/EnderecoController')

const enderecoRoutes = Router()

const enderecoController = new EnderecoController()

enderecoRoutes.post('/', enderecoController.create)



module.exports = enderecoRoutes