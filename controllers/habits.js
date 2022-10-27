const Habit = require('../model/model');

// const day = 8.64e+7;
const day = 10000;
const week = 6.048e+8
const month = 2.628e+9

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

// async function destroy (req, res) {
//         try {
            
//         } catch (err) {
            
//         }
// }

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
        // const day = 8.64e+7;
        // const day = 10000;
        // const week = 6.048e+8
        // const month = 2.628e+9
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        user.habits.forEach(habit => {
            if (user.habits[index].frequency == "Daily" && Date.now() > user.habits[index].timeofLastComplete) {
                if(user.habits[index].isCompleted == false){
                    user.habits[index].streak = 0
                }
                    
                user.habits[index].isCompleted = false
                user.habits[index].timeofLastComplete += day
            } else if (user.habits[index].frequency == "Weekly" && Date.now() > user.habits[index].timeofLastComplete) {
                if(user.habits[index].isCompleted == false){
                    user.habits[index].streak = 0
                }
                    
                user.habits[index].isCompleted = false
                user.habits[index].timeofLastComplete += week
            } else if (user.habits[index].frequency == "Monthly" && Date.now() > user.habits[index].timeofLastComplete) {
                if(user.habits[index].isCompleted == false){
                    user.habits[index].streak = 0
                }
                    
                user.habits[index].isCompleted = false
                user.habits[index].timeofLastComplete += month
            }
        })
        const newUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
        }})
        const updatedUser = (await Habit.find({ username: req.params.username }).limit(1))[0]


        if(index >= 0 && index < updatedUser.habits.length){
            res.status(200).json(updatedUser.habits[index])
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
        let timeAdded = 0

        switch(req.body.frequency){
            case "Daily":
                timeAdded = day;
                break;
            case "Weekly":
                timeAdded = week;
                break;
            case "Monthly":
                timeAdded = month;
                break;
        }

        // const index = req.params.id
        const newHabit = {
            habit: req.body.habit,
            frequency: req.body.frequency,
            streak: 0,
            isCompleted: false,
            timeofLastComplete: Date.now() + timeAdded
        }
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        user.habits.push(newHabit)
        console.log("created user",user);
        const updatedUser = await Habit.updateOne({ username: req.params.username }, {$set :{
            habits: user.habits
        }})
        res.status(200).json(updatedUser)
        // const user = await Habit.updateOne({ username: req.params.username }, {

        // })
        

        res.status(201).json(user)
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
        let timeAdded = 0

        switch(req.body.frequency){
            case "Daily":
                timeAdded = day;
                break;
            case "Weekly":
                timeAdded = week;
                break;
            case "Monthly":
                timeAdded = month;
                break;
        }

        const index = req.params.id;
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        console.log(user);

        if(!user.habits[index].isCompleted){
            user.habits[index].isCompleted = true;
            user.habits[index].streak++;
            user.habits[index].timeofLastComplete = Date.now() + timeAdded - ((Date.now() - user.habits[index].timeofLastComplete) % timeAdded);
        }

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
        let timeAdded = 0

        switch(req.body.frequency){
            case "Daily":
                timeAdded = day;
                break;
            case "Weekly":
                timeAdded = week;
                break;
            case "Monthly":
                timeAdded = month;
                break;
        }
        const index = req.params.id;
        const frequency = req.body.frequency
        const user = (await Habit.find({ username: req.params.username }).limit(1))[0]
        user.habits[index].frequency = frequency
        user.habits[index].streak = 0
        user.habits[index].isCompleted = false
        user.habits[index].timeofLastComplete = Date.now() + timeAdded
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
    // destroy,
    getHabits,
    getHabit,
    editHabit,
    deleteHabit,
    completed,
    frequency
}
