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

    // beforeEach(() => jest.clearAllMocks());

    // afterAll(() => jest.resetAllMocks());

    describe('getAll', () => {
        test('it returns all users and their habits with a 200 status code', async () => {
            const req = {}
            const res = { status: jest.fn(() => res), json: jest.fn(() => res) }
            await habitsController.getAll(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: userData
            })
        })
    });

    // describe('show', () => {
    //     test('it returns a specific user and their habits with a 200 status code', async () => {
    //         jest.spyOn(Habit, 'show')
    //             .mockResolvedValue(new Habit({ id: 1, name: 'Test User' }));
    //         jest.spyOn(Habit.prototype, 'books', 'get')
    //             .mockResolvedValue(['book1', 'book2']);

    //         const mockReq = { params: { id: 1 } }
    //         await authorsController.show(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith({
    //             id: 1,
    //             name: 'Test Author',
    //             books: ['book1', 'book2']
    //         });
    //     })
    // });

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

    })

    describe('getHabit', () => {

    })

    describe('editHabit', () => {

    })

    describe('deleteHabit', () => {

    })

})