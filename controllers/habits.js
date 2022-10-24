const Habit = require('../model/model');

//shows all users
async function getAll (req, res) {
    try {
        const habits = await Habit.find({});
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
}

//shows details about one user
async function show (req, res) {
    try {
        console.log("username", req.params.username)
        
        const user = await Habit.find({ username: req.params.username }) 
        console.log(user);
        //const habits = await Habit.find({_id : req.params.id});
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

//create new account
async function create (req, res) {
    try {
        const habit = await Habit.create(req.body).save();
        res.status(201).json(habit)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroy (req, res) {
        try {
            
        } catch (err) {
            
        }
}

async function getHabits(req, res){
    try {
        const user = await Habit.find({ username: req.params.username })
        res.status(200).json(user.habits)
    } catch (err) {
        console.error(err)
    }
}

async function getHabit(req, res){
    try {

    } catch (err) {
        console.error(err)
    }
}

// Adding, removing and updating habits for a specific user
async function editHabit (req, res) {
    try {
        
    } catch (err) {
        console.error(err)
    }
}

async function deleteHabit(req, res){
    try {

    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    getAll,
    show,
    create,
    destroy,
    getHabits,
    getHabit,
    editHabit,
    deleteHabit
}
