const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    habits: [{
        habit: String,
        frequency: String,
        streak: Number,
        isCompleted: Boolean
    }]

});

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit;
