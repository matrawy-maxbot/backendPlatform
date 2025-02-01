import { Sequelize } from 'sequelize';
import { postgresql } from '../../../../config/database.config.js';
import { NODE_ENV } from '../../../../config/server.config.js';

const sequelize = new Sequelize(postgresql.database, postgresql.user, postgresql.password, {
  host: postgresql.host,
  port: postgresql.port,
  dialect: 'postgres',
  logging: NODE_ENV !== 'development' ? console.log : false,
  pool: {
    max: 5, // أقصى عدد اتصالات
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const development = { // Don't change the name of this constant
     username: postgresql.user,
     password: postgresql.password,
     database: postgresql.database,
     host: postgresql.host,
     port: postgresql.port,
     dialect: 'postgres',
     dialectOptions: {
          bigNumberStrings: true,
     },
};
export const test = { // Don't change the name of this constant
     username: postgresql.user,
     password: postgresql.password,
     database: postgresql.database,
     host: postgresql.host,
     port: postgresql.port,
     dialect: 'postgres',
     dialectOptions: {
          bigNumberStrings: true,
     },
};
export const production = { // Don't change the name of this constant
     username: postgresql.user,
     password: postgresql.password,
     database: postgresql.database,
     host: postgresql.host,
     port: postgresql.port,
     dialect: 'postgres',
     dialectOptions: {
          bigNumberStrings: true,
     },
};

export default sequelize;