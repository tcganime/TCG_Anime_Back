import { Schema, model } from 'mongoose';

const archetypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
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
    },
    traps: {
        type: [String],
        required: true,
        default: []
    },
    spells: {
        type: [String],
        required: true,
        default: []
    },
    monsters: {
        type: [String],
        required: true,
        default: []
    }
});

const Archetype = model('Archetype', archetypeSchema);

module.exports = Archetype;