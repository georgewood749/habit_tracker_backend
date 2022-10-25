const mongoose = require("mongoose");
const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const Habit = require("../model/model");

describe('Habit Model', () => {
    let api;
    
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await dropDB()
    });

    afterEach(async () => {
        await dropCollections();
    });

    it("should create user succesfully", async () => {
        let validUser = {
            username: "mcee",
            password: "12346578",
        };
        const newUser = await Habit(validUser);
        await newUser.save();
        expect(newUser._id).toBeDefined();
        expect(newUser.username).toBe(validUser.username);
    })

    it("should create habit succesfully", async () => {
        let validHabits = {
            username: "gwood",
            password: "912345678",
            habits: [
            {id: 1,
            habit: "Eat",
            streak: 12,
            isCompleted: true}
            ]
        };
        const newHabits = await Habit(validHabits);
        await newHabits.save();
        expect(newHabits.habits[0]._id).toBeDefined(); 
        expect(newHabits.habits).toBe(validHabits.habits);
    })
})

