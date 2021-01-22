const dotenv = require("dotenv")
let env = process.env.NODE_ENV || "development"


const path = `src/db/config/.env.${env}`
console.log(`Loading database config from environment file ${path}`)
dotenv.config({ path })



module.exports = {
  app:
    {
      username: process.env.APP_DB_USERNAME,
      password: process.env.APP_DB_PASSWORD,
      database: process.env.APP_DB_DATABASE,
      host: process.env.APP_DB_HOST,
      dialectOptions:
        {
          ssl: process.env.APP_DB_SSL,
          rejectUnauthorized: process.env.APP_DB_REJECT_UNAUTHORIZED,
        },
      dialect: process.env.APP_DB_DIALECT,
    },
  stakeholders:
    {
      username: process.env.STAKEHOLDERS_DB_USERNAME,
      password: process.env.STAKEHOLDERS_DB_PASSWORD,
      database: process.env.STAKEHOLDERS_DB_DATABASE,
      host: process.env.STAKEHOLDERS_DB_HOST,
      dialectOptions:
        {
          ssl: process.env.STAKEHOLDERS_DB_SSL,
          rejectUnauthorized: process.env.STAKEHOLDERS_DB_REJECT_UNAUTHORIZED,
        },
      dialect: process.env.STAKEHOLDERS_DB_DIALECT,
    },
}

