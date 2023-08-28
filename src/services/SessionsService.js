const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

class SessionsService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }
  async loginUser({email}){
    const user = await this.sessionsRepository.findByEmail({ email });
    return user;
  }
  async createSession({ email, password }) {
      const user = await this.sessionsRepository.findByEmail({ email });

    if (!user.email) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);


    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });



        return (user, token);
    
  }
}

module.exports = SessionsService;
