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
        const user = await Habit.find({ username: req.params.username })
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
        const index = req.params.id
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]

        if(index >= 0 && index < user.habits.length){
            res.status(200).json(user.habits[index])
        } else {
            res.status(404).json('Invalid id')
        }
    } catch (err) {
        console.error(err)
    }
}

// Adding, removing and updating habits for a specific user
async function editHabit (req, res) {
    try {
        // const index = req.params.id
        const newHabit = {
            habit: req.body.habit,
            frequency: req.body.frequency,
            streak: 0,
            isCompleted: false
        }
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        user.habits.push(newHabit)
        console.log(user);
        const updatedUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
        }})
        res.status(200).json(updatedUser)
        // const user = await Habit.updateOne({ username: req.params.username }, {

        // })
        
        // res.status(200).json(user)
    } catch (err) {
        console.error(err)
    }
}

async function deleteHabit(req, res){
    try {
        const index = req.params.id
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        // const habit = user.habits[index]
        
        const deleted = user.habits.splice(index, 1)
        const updatedUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
        }})
        res.status(200).json("habit deleted")
    } catch (err) {
        console.error(err)
    }
}

async function completed(req, res){
    try {
        const index = req.params.id;
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        console.log(user);
        user.habits[index].isCompleted = true;
        user.habits[index].streak++;
        console.log(user.habits);
        const updatedUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
        }})
        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err)
    }
}

// db.users.update ({_id: '123'}, { '$set': {"friends.0.emails.1.email" : '2222'} })

async function frequency(req, res){
    try {
        const index = req.params.id;
        const frequency = req.body.frequency
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        user.habits[index].frequency = frequency
        const updatedUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
    }})
    res.status(200).json(updatedUser)
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
    deleteHabit,
    completed,
    frequency
}
