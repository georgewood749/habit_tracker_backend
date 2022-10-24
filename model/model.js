const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
    {
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    habits: [{
        habit: String,
        frequency: String,
        streak: Number,
        isCompleted: Boolean
    }]
    }
);

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit;
