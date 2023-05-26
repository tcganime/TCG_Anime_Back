import { Schema, model } from 'mongoose';

const monsterCardSchema = new Schema({
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
    attribute: {
        type: String,
        required: true,
        default: ''
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    atk: {
        type: Number,
        required: true,
        default: 0
    },
    def: {
        type: Number,
        required: true,
        default: 0
    },
    archetypes: {
        type: [String],
        required: true,
        default: []
    },
    card_type: {
        type: [String],
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

const MonsterCard = model('MonsterCard', monsterCardSchema);

module.exports = MonsterCard;