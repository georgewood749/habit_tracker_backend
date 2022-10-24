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
        const habits = await Habit.find({_id : req.params.id});
        res.status(200).json(habits)
    } catch (err) {
        res.status(404).json({err})
    }
}





module.exports = { getAll, show }
