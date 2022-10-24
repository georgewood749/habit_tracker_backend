const Habit = require('../model/model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//require('dotenv').config();

async function register (req, res) {
    try {
        
        console.log(req.body);
        console.log("****************");
        console.log(req.body.password)
        console.log("****************");
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        console.log(hashed);
        const user = await Habit.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
}

async function login (req, res) {
        try {
            const user = await Habit.find({ username: req.body.username })   
            if(!user){ throw new Error('No user with this name') }
            const authed = bcrypt.compare(req.body.password, user[0].password)
            if (!!authed){
                const payload = {username: user[0].username }
                const sendToken = ( err, token ) => {
                    if (err) { throw new Error('Error in token generation')}
                    res.status(200).json({
                        success: true,
                        token: token
                    })
                }
                const token = jwt.sign(payload, process.env.SECRET, {expiresIn:600}, sendToken);
                console.log(token);
            } else {
                throw new Error('User could not be authenticated')  
            }
        } catch (err) {
            res.status(401).json({ err: err.message });
        }
}


module.exports = { register, login}

