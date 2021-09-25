import { Sequelize } from 'sequelize';
import users from './Schemas/Users';

//const { DATABASE_PASSWORD, USER, DATABASE } = process.env as { [x: string]: string };
const sequelize = new Sequelize('moon', 'moon', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Models = {
    Users: users(sequelize)
};

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

sequelize.sync();

export { sequelize, Models };
