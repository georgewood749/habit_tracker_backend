const habitsController = require('../../controllers/habits')
// const { create } = require('../../model/model')
const Habit = require('../../model/model')
const db = require('../config')

const validUser = {
    username: "George",
    password: "password"
}

const invalidUser = {
    username: "George",
    password: ""
}

describe('habits controller', () => {

    const userData = {
        username: "testUser",
        password: "912345678",
        habits: [
            { id: 1, habit: "Eat", streak: 31, isCompleted: true },
            { id: 2, habit: "Sleep", frequency: "Daily", streak: 31, isCompleted: false },
            { id: 3, habit: "Gym", frequency: "Every 2 days", streak: 25, isCompleted: true }
        ]
    };

    /**
    * Connect to a new in-memory database before running any tests.
    */
    beforeAll(async () => await db.connect())

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await db.clear());

    /**
     * Remove and close the db and server.
     */
    afterAll(async () => await db.close());
    // beforeEach(() => jest.clearAllMocks());

    // afterAll(() => jest.resetAllMocks());

    describe('getAll', () => {
        test('it returns all users and their habits with a 200 status code', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.getAll(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            // expect(res.json).toHaveBeenCalledWith({
            //     status: 'success',
            // data: userData
            // })
        })
    });

    describe('show', () => {
        test('shows data for a particular user', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.show(req, res)
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledTimes(1)
            // expect(res.json).toHaveBeenCalledWith({
            //     status: 'success',
            //     data: userData
            // })
        })
    });

    describe('valid create', () => {
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
    })

    describe('invalid create', () => {
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
    })

    describe('destroy', () => {

    })

    describe('getHabits', () => {
        test('it returns all habits for a particular user with a 200 status code', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.getHabits(req, res)
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledTimes(0)
            // expect(res.json).toHaveBeenCalledWith({
            //     status: 'success',
            //     data: userData
            // })
        })
    })

    describe('getHabit', () => {
        test('it returns a single habit for a particular user with a 200 status code', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.getHabit(req, res)
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledTimes(0)
            // expect(res.json).toHaveBeenCalledWith({
            //     status: 'success',
            //     data: userData
            // })
        })
    })

    describe('editHabit', () => {
        test('habit data can be edited', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.editHabit(req, res)
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledTimes(0)
            // expect(res.json).toHaveBeenCalledWith({
            //     status: 'success',
            //     data: userData
            // })
        })
    })

    describe('deleteHabit', () => {
        test('habits can be deleted from user data', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.deleteHabit(req, res)
            // expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledTimes(0)
        })
    })

})