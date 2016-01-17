import Sequelize from 'sequelize'

let User = sequelize.define('user', {
  name: Sequelize.STRING,
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  background: Sequelize.STRING,
  token: Sequelize.STRING,
});


export default User
