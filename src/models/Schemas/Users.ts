import { DataTypes, Sequelize, ModelCtor, Model } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (sequelize: Sequelize) {
    const model = {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            unique: false
        }
    }
    return sequelize.define('users', model) as ModelCtor<Model<any, any> & { [x in keyof typeof model]: string }>;
}