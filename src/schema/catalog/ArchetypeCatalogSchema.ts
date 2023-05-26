import { Schema, model } from 'mongoose';

const archetypeSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        autoIncrement: true
    },
    archetype_id: {
        type: Schema.Types.ObjectId,
        ref: 'Archetype',
        required: true
    },
    cards: {
        type: [Schema.Types.ObjectId],
        ref: 'Card',
        required: true
    },
    spells: {
        type: [Schema.Types.ObjectId],
        ref: 'SpellCard',
        required: true
    },
    monsters: {
        type: [Schema.Types.ObjectId],
        ref: 'MonsterCard',
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});