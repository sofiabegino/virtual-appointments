"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./../config/config");
// import {setupModels} from './../db/models';
const USER = encodeURIComponent(config_1.config.dbUser);
const PASSWORD = encodeURIComponent(config_1.config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config_1.config.dbHost}:${config_1.config.dbPort}/${config_1.config.dbName}`;
const sequelize = new sequelize_1.Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});
// setupModels(sequelize);
// sequelize.sync();
exports.default = sequelize;
