
const SessionsRepository = require('../repositories/SessionsRepository')
const SessionsService = require('../services/SessionsService')


class SessionsController {
     async create(request, response) {
          const { email, password } = request.body;

          const sessionsRepository = new SessionsRepository()
          const sessionsService = new SessionsService(sessionsRepository)



          const token = await sessionsService.createSession({ email, password })
          const user = await sessionsService.loginUser({ email })




          // const user = await knex("users").where({ email }).first();

          // if (!user) {
          //      throw new AppError("E-mail e/ou senha incorreta", 401)
          // }

          // const passwordMatched = await compare(password, user.password)

          // if (!passwordMatched) {

          //      throw new AppError("E-mail e/ou senha incorreta", 401)
          // }

          // const { secret, expiresIn } = authConfig.jwt;
          // const token = sign({}, secret, {
          //      subject: String(user.id),
          //      expiresIn
          // })



          // return response.json({ user, token })
          return response.json({ user, token })

     }
}

module.exports = SessionsController;