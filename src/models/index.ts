import { Sequelize } from 'sequelize';
import users from './Schemas/Users';

const { DATABASE_PASSWORD, USER, DATABASE } = process.env as { [x: string]: string };
const sequelize = new Sequelize(DATABASE, USER, DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Models = {
    Users: users(sequelize)
};

sequelize.sync();

export { sequelize, Models };
