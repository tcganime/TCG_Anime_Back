import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';
import Archetypes from './archetypes.models';

class Card extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public card_type!: string;
    public type!: Array<string>;
    public created_at!: Date;
    public updated_at!: Date;
    public effect!: string;
    public image!: string;
    public archetypes!: Array<number>;
    public limited!: number;
}

Card.init({
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    card_type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
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
    effect: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    archetypes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        references: {
            model: 'Archetypes', 
            key: 'id',
        },
        allowNull: true,
        defaultValue: [],
    },
    limited: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Card',
    timestamps: true,
    underscored: true,
    tableName: 'cards',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

export default Card;

