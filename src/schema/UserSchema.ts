const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
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
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    victories: {
        type: Number,
        required: false,
        default: 0
    },
    defeats: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = model('User', UserSchema);
