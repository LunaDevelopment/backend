import { DataTypes, Sequelize, ModelCtor, Model } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (sequelize: Sequelize) {
    const model = {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        },
        coins: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0
        },
        wins: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0
        },
        loses: {
            type: DataTypes.INTEGER,
            unique: false,
            defaultValue: 0
        },
        friends: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false
        },
        logintype: {
            type: DataTypes.STRING,
            unique: false,
            defaultValue: 'local'
        },
        premium: {
            type: DataTypes.BOOLEAN,
            unique: false,
            defaultValue: false
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return sequelize.define('users', model) as ModelCtor<Model<any, any> & { [x in keyof typeof model]: string }>;
}
