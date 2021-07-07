

const Sequelize = require("sequelize");

if(process.env.DATABASE_URL){
    var db = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false
    });
  }
else{
    var db = new Sequelize('messenger',  'hatchways', '12345', {
      host: 'localhost',
      dialect: 'postgres',
      logging: false
  })
}

module.exports = db;
