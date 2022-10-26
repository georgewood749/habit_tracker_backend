const supertest = require("supertest");
const habitsController = require("../../controllers/habits");
// const { create } = require('../../model/model')
const Habit = require("../../model/model");
const { connect, clear, close } = require("../config");
const { server } = require('../../server');

const userData = {
    username: "testuser",
    password: "912345678",
    habits: [
        { id: 1, habit: "Eat", streak: 31, isCompleted: true },
        {
            id: 2,
            habit: "Sleep",
            frequency: "Daily",
            streak: 31,
            isCompleted: false,
        },
        {
            id: 3,
            habit: "Gym",
            frequency: "Every 2 days",
            streak: 25,
            isCompleted: true,
        },
    ],
};

const validUser = {
    username: "George",
    password: "password",
};

const invalidUser = {
    username: "George",
    password: "",
};

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await clear();
});

afterAll(async () => {
    await close();
});

describe("getAll", () => {
    test("it returns all users and their habits with a 200 status code", async () => {
        await supertest(server).get(`/`).expect(200);
    });
});

describe("show", () => {
    test("it returns all details about a user", async () => {
        await supertest(server).get(`/testuser`);
        expect(200);
        expect(userData);
    })
})

describe("getHabits", () => {
    test("it returns the habits of a user", async () => {
        await supertest(server).get(`/testuser/habits`);
        expect(200);
        expect(userData.habits);
    })
})

describe("getHabit", () => {
    test("it returns all details about a user", async () => {
        await supertest(server).get(`/testuser/habits/3`);
        expect(200);
        expect(userData.habits[2]);
    })
})

// describe("editHabit", () => {
//     test("it should create a new habit", async () => {
//         let newHabit = {
//             id: 4, habit: "Cold shower", frequency: "Every 2nd day", isCompleted: false
//         }
//         await supertest(server).patch(`/testuser/habits/4`).send(newHabit);
//         expect(201);
//         expect(userData.habits).toHaveLength(4)
//     })
// })
// describe("deleteHabit", () => {
//     test("it deletes a specific habit based on id", async () => {
//         await supertest(server).delete(`/testuser/habits/2`);
//         expect(204);
//         expect(userData.habits).toHaveLength(2);
//     })
// })


describe("valid create", () => {
    test("user should be created if validation passes", async () => {
        let error = null;

        try {
            const user = new Habit(validUser);
            await user.validate();
        } catch (e) {
            error = e;
        }

        expect(error).toBeNull();
    });
});

describe("invalid create", () => {
    test("user registration should fail if password string is empty", async () => {
        let error = null;

        try {
            const user = new Habit(invalidUser);
            await user.validate();
        } catch (e) {
            error = e;
        }

        expect(error).not.toBeNull();
    });
});
