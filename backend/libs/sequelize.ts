import { Sequelize } from 'sequelize';

import { config } from './../config/config';
// import {setupModels} from './../db/models';

const USER = encodeURIComponent(config.dbUser)!;
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI);
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});


// setupModels(sequelize);
// sequelize.sync();

export default sequelize;

