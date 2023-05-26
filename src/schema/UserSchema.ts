const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        autoIncrement: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
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

const User = model('User', UserSchema);

module.exports = User;
