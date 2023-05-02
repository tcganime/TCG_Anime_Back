import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';

class Card extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public card_type!: string;
    public type!: Array<string>;
    public created_at!: Date;
    public updated_at!: Date;
    public functionality!: object;
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
    functionality: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'Card',
    timestamps: true,
    underscored: true,
    tableName: 'cards',
});

export default Card;

