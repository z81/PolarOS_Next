import Sequelize from 'sequelize';

global.sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: __dirname + '/_database.sqlite'
})
