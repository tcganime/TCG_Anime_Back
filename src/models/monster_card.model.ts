import { DataTypes, Model } from 'sequelize';
import sequelize from '../db_sequelize';

class MonsterCard extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public archetypes!: string;
    public level!: number;
    public atk!: number;
    public def!: number;
    public attribute!: string;
    public card_type!: string;
    public monster_type!: string;
    public effect!: string;
    public description!: string;
    public image_url!: string;
}

MonsterCard.init({
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
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    def: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    attribute: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    card_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    monster_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: [],
    },
    effect: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    }
}, {
    sequelize,
    modelName: 'MonsterCard',
    timestamps: true,
    underscored: true,
    tableName: 'monster_cards',
    freezeTableName: true,
});

export default MonsterCard;