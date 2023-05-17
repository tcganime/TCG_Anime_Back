import { DataTypes, Model } from 'sequelize';
import sequelize from '../db_sequelize';

class TrapCard extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public archetypes!: Array<number>;
    public type!: string;
    public effect!: string;
    public description!: string;
    public image_url!: string;
}

TrapCard.init({
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
    archetypes: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
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
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
}, {
    sequelize,
    modelName: 'TrapCard',
    timestamps: true,
    underscored: true,
    tableName: 'trap_cards',
    freezeTableName: true,

});

export default TrapCard;