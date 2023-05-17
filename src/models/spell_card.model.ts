import { DataTypes, Model } from 'sequelize';
import sequelize from '../db_sequelize';

class SpellCard extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public archetypes!: Array<number>;
    public type!: string;
    public effect!: string;
    public description!: string;
    public image!: string;
}

SpellCard.init({
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
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    archetypes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
        references: {
            model: 'Archetypes',
            key: 'id',
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    effect: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
}, {
    sequelize,
    modelName: 'SpellCards',
    timestamps: true,
    underscored: true,
    tableName: 'spell_cards',
    freezeTableName: true,
});

export default SpellCard;