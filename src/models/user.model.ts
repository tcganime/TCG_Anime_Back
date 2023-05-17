import { DataTypes, Model } from 'sequelize';
import sequelize from '../db_sequelize';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public admin!: boolean;
    public victories!: number;
    public defeats!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    victories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    defeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    underscored: true,
    tableName: 'users',
    freezeTableName: true,
});

export default User;