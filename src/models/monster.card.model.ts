import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_sequelize';

class MonsterCard extends Model {
    public id! : number;
    public name! : string;
    public readonly created_at! : Date;
    public readonly updated_at! : Date;
    public card_type! : string;
    public monster_type! : string[];
    public attribute! : string;
    public level! : number;
    public atk! : number;
    public def! : number;
    public description! : string;
    public image_url! : string;
    public effect! : object[];
    public archetypes! : string[];
}

MonsterCard.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    card_type: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    monster_type: {
        type: DataTypes.ARRAY(DataTypes.STRING(255)),
        allowNull: false
    },
    attribute: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    def: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    effect: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    archetypes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'monster_cards',
    modelName: 'MonsterCard',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

export default MonsterCard;