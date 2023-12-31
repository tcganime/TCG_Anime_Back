import { Schema, model } from 'mongoose';

const deckSchema = new Schema({
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
    archetypes: {
        type: [String],
        required: true,
        default: []
    },
    card_type: {
        type: String,
        required: true,
        default: ''
    },
    effect: {
        type: [Object],
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    image_url: {
        type: String,
        required: true,
        default: ''
    }
});