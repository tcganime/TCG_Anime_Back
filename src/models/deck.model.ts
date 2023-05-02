import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';

class Deck extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Deck.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    composition: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'Deck',
    timestamps: true,
    underscored: true,
    tableName: 'decks',
});

export default Deck;  