const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.propriedades = require("./propriedade.model.js")(sequelize, Sequelize);
db.granjas = require("./granja.model.js")(sequelize, Sequelize);
db.lotes = require("./lote.model.js")(sequelize, Sequelize);




module.exports = db;
