import { Sequelize } from 'sequelize';
import users from './Schemas/Users';
import stats from './Schemas/Stats';

const { DATABASE_PASSWORD, USER, DATABASE } = process.env as { [x: string]: string };

const sequelize = new Sequelize(DATABASE, USER, DATABASE_PASSWORD, {
    dialect: 'postgres',
    logging: false
});

const models = {
    Users: users(sequelize),
    Stats: stats(sequelize)
};

sequelize.sync();

export { sequelize };
export default models;
