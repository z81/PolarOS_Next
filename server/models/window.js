import Sequelize from 'sequelize';
import User from './user';
import App from './app';

let Window = sequelize.define('window', {
  title: Sequelize.STRING,
  left: Sequelize.INTEGER,
  top: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER
})

User.Window = User.hasMany(Window, {as: 'windows'})
Window.App = Window.belongsTo(App, {as: 'app', foreignKey: 'appId'})


export default Window
