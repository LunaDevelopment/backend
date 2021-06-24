import { DataTypes, Sequelize, ModelCtor, Model } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (sequelize: Sequelize) {
    const model = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        coins: {
            type: DataTypes.INTEGER,
            unique: false
        },
        wins: {
            type: DataTypes.INTEGER,
            unique: false
        },
        loses: {
            type: DataTypes.INTEGER,
            unique: false
        }
    }

    return sequelize.define('stats', model) as ModelCtor<Model<any, any> & { [x in keyof typeof model]?: string }>;
}
