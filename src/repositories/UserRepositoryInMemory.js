class UserRepositoryInMemory {
     users = [];

     async create({ email, name, password }) {
          const user = {
               id: Math.floor(Math.random() * 1000) + 1,
               email,
               name,
               password
          }

          this.users.push(user);

          return user;
     }
     async findByEmail(email) {
          return this.users.find(user => user.email === email);
     }

     async findById(id) {
          return this.users.find(user => user.id === id);
     }

     async update({ id, name, email, password}) {
          
          const user = {
               id,
               email,
               name,
               password, 
              
          }

          this.users.push(user);

          return user;
     }
}

module.exports = UserRepositoryInMemory;