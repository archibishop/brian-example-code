const Sequelize = require('sequelize');
const DetailsModel = require('./models/details')

const DB_URI = process.env['DB_URI']
var sequelize = new Sequelize(DB_URI);

const Details = DetailsModel(sequelize, Sequelize);

async function createDatabase() {
    await sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    })

    await sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
    })
}



module.exports = {
  Details,
  createDatabase
}