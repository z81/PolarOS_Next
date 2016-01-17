import Sequelize from 'sequelize'
import { App, User } from './'

let UserApps = sequelize.define('user_app', {
})

UserApps.associate = ()=> {
  User.belongsToMany(App, { through: UserApps })
  App.belongsToMany(User, { through: UserApps })
}

export default UserApps
