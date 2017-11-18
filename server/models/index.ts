'use strict';

import appConfig from '../config/app-config';
let config = appConfig();
let fs        = require('fs');
let path      = require('path');
let Sequelize = require('sequelize');
let basename  = path.basename(module.filename);
let env       = config.env || 'development';
let db : any        = {};
let sequelize;

if (config.dbURL) {
  sequelize = new Sequelize(config.dbURL);
} else {
   sequelize = new Sequelize(config.db, config.username, config.password);
}
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    let extension = '.js'
    if(process.env.NODE_ENV == 'development') extension = '.ts'
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === `${extension}`);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;