import Sequelize from 'sequelize'

let App = sequelize.define('app', {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  manifest: Sequelize.STRING
});

export default App
