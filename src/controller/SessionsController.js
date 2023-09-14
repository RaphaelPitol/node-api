
const SessionsRepository = require('../repositories/SessionsRepository')
const SessionsService = require('../services/SessionsService')


class SessionsController {
     async create(request, response) {
          const { email, password } = request.body;

          const sessionsRepository = new SessionsRepository()
          const sessionsService = new SessionsService(sessionsRepository)



          const token = await sessionsService.createSession({ email, password })
          const user = await sessionsService.loginUser({ email })

          return response.json({ user, token })

     }
}

module.exports = SessionsController;