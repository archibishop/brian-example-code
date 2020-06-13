const Sequelize = require('sequelize');
const DetailsModel = require('./models/details')

const DB_URI = process.env['DB_URI']
var sequelize = new Sequelize(DB_URI);

const Details = DetailsModel(sequelize, Sequelize);

function createDatabase(func) {
    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    })

    sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
        func().then(res=> console.log("Data Saved"));
    })
}



module.exports = {
  Details,
  createDatabase
}