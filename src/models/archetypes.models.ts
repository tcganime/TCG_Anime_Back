import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';

class Archetypes extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Archetypes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
}, {
    sequelize,
    tableName: 'archetypes',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    freezeTableName: true,
});

export default Archetypes;