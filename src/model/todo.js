const {Schema, model } = require("mongoose");

const userSchema = new Schema({
    title : {
        type: String,
        required: true,
        minLength : 3,
        maxLength : 30
    },
    description : {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
}, {timestamps: true});

const todoModel = model("todo", userSchema);

module.exports = todoModel;