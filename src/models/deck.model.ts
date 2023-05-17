import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';

class Deck extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public composition!: object;
    public user_id!: number;
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
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        // postgres version
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    composition: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
}, {
    sequelize,
    modelName: 'Deck',
    timestamps: true,
    underscored: true,
    tableName: 'decks',
    freezeTableName: true,
});

export default Deck;  