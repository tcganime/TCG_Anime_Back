import { DataTypes, Model } from 'sequelize';
import sequelize from '../db_sequelize';

class MonsterCard extends Model {
    public id!: number;
    public name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public archetype!: Array<number>;
    public level!: number;
    public atk!: number;
    public def!: number;
    public attribute!: string;
    public monster_type!: Array<string>;
    public effect!: string;
    public description!: string;
    public image!: string;
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
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    archetype: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        references: {
            model: 'Archetypes',
            key: 'id',
        }
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    attribute: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    monster_type: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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