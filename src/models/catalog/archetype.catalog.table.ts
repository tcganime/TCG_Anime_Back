import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/db_sequelize';

class ArchetypeCatalog extends Model {
    public id!: number;
    public archetype_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public monsters!: number[];
    public spells!: number[];
    public traps!: number[];
}

ArchetypeCatalog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    archetype_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'archetypes',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    monsters: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    spells: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    traps: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ArchetypeCatalog',
    tableName: 'archetype_catalog',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
});

export default ArchetypeCatalog;