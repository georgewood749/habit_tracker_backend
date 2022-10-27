const mongoose = require("mongoose");
const crypto = require('crypto');

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
        id: Number,
        habit: String,
        frequency: String,
        streak: Number,
        isCompleted: Boolean,
        timeofLastComplete: Number
    }]

});

const keyLength = 512;
const iterations = 10000;
const digest = "sha512";
const encoding = "hex";

habitSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
        .toString(encoding);
};

habitSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, iterations, keyLength, digest)
        .toString(encoding);
    return this.hash === hash;
};

habitSchema.statics.generateSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

habitSchema.statics.generateHash = function (password, salt) {
    try {
        const hmac = crypto.createHmac('sha1', salt)
        hmac.update(password)
        return hmac.digest('hex')
    } catch (err) {
        return err
    }
}

habitSchema.statics.authenticate = function(password, hashedPass, salt) {
    return habitSchema.statics.generateHash(password, salt) === hashedPass
}

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit;
