'use strict';

const fs = require("fs")
const path = require("path")
import dotenv from "dotenv"

dotenv.config()
const Sequelize = require("sequelize")
const basename = path.basename(__filename)
//console.log(process.env.NODE_ENV)
import  config  from "../config/config"

const db = {}

const databases = Object.keys(config)
for (let i = 0; i < databases.length; ++i) {
  let database = databases[i]
  let dbPath = config[database]
  db[database] = new Sequelize(dbPath)
  db[database].dialect.supports.schemas = true;
  //console.log(db[database])

}


// let sequelize;
// if (config.use_env_variable) {
//   console.log('a')
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
fs
  .readdirSync(__dirname + "/app")
  .filter(file =>
    (file.indexOf(".") !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === ".js"))
  .forEach(file => {
    const model = require(path.join(__dirname + "/app", file))(db.app, Sequelize.DataTypes)
    db.app[model.name] = model
  })

fs
  .readdirSync(__dirname + "/stakeholders")
  .filter(file =>
    (file.indexOf(".") !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === ".js"))
  .forEach(file => {
    const model = require(path.join(__dirname + "/stakeholders", file))(db.stakeholders, Sequelize.DataTypes)
    db.stakeholders[model.name] = model
  })

//console.log(db.app.models)
Object.keys(db).forEach(dbName => {
  //console.log(db[dbName].models)
  Object.keys(db[dbName]).forEach(modelName => {
      //console.log(modelName)
      if (db[dbName][modelName].associate) {
        db[dbName][modelName].associate(db)
      }
    })
})



//db.sequelize = db.app;
//db.Sequelize = Sequelize;

module.exports = db
