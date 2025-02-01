import { Sequelize } from 'sequelize';
import { mysql } from '../../../../config/database.config.js';
import { NODE_ENV } from '../../../../config/server.config.js';

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql',
  logging: NODE_ENV !== 'development' ? console.log : false,
  pool: {
    max: 5, // أقصى عدد اتصالات
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const development = { // Don't change the name of this constant
     username: mysql.user,
     password: mysql.password,
     database: mysql.database,
     host: mysql.host,
     port: mysql.port,
     dialect: 'mysql',
     dialectOptions: {
          bigNumberStrings: true,
     },
};
export const test = { // Don't change the name of this constant
     username: mysql.user,
     password: mysql.password,
     database: mysql.database,
     host: mysql.host,
     port: mysql.port,
     dialect: 'mysql',
     dialectOptions: {
          bigNumberStrings: true,
     },
};
export const production = { // Don't change the name of this constant
     username: mysql.user,
     password: mysql.password,
     database: mysql.database,
     host: mysql.host,
     port: mysql.port,
     dialect: 'mysql',
     dialectOptions: {
          bigNumberStrings: true,
     },
};

export default sequelize;