import { Schema, model } from 'mongoose';

const archetypeSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: String,
        unique: true,
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
    }
});

const Archetype = model('Archetype', archetypeSchema);

module.exports = Archetype;