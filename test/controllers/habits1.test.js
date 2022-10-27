const habitsController = require('../../controllers/habits')
const Habit = require('../../model/model');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe("habits controller", () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getAll', () => {
        test('it returns habits with a 200 status code', async () => {
            jest.spyOn(Habit, 'find')
                 .mockResolvedValue(['author1', 'author2']);
            await habitsController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['author1', 'author2']);
        })
    });

    describe('show', () => {
        test('it details for one user with a 200 status code', async () => {
            jest.spyOn(Habit, 'find')
                 .mockResolvedValue(['author1', 'author2']);
            const mockReq = { params: { username: "username"} }
            await habitsController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['author1', 'author2']);
        })
    });

    // describe('create', () => {
    //     test('it returns a new account with a 201 status code', async () => {
    //         let testAccount = {
    //             username: "username",
    //             password: "password"
    //         }
    //         jest.spyOn(Habit, 'create')
    //             .mockResolvedValue(testAccount);
    //         jest.spyOn(Habit, 'save')
    //             .mockResolvedValue(testAccount);
                
    //         const mockReq = { body: testAccount }
    //         await habitsController.create(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(201);
    //         expect(mockJson).toHaveBeenCalledWith(testAccount);
    //     })
    // });

    describe('getHabits', () => {
        test('it gets habits for one user with a 200 status code', async () => {
            jest.spyOn(Habit, 'find')
                 .mockResolvedValue({habits:['habit1', 'habit2']});
            const mockReq = { params: { username: "username"} }
            await habitsController.getHabits(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('getHabit', () => {
        test('it gets a single habit for one user with a 200 status code', async () => {
            jest.spyOn(Habit, 'find')
                 .mockResolvedValue([{habits:[{
                    habit:'habit1',
                    frequency: "Daily",
                    streak: 0,
                    isCompleted: false,
                    timeofLastComplete: 1666862319297
                }]}])
            jest.spyOn(Habit, "updateOne")
                .mockResolvedValue("updated")
            const mockReq = { params: { username: "username", id: 0} }
            await habitsController.getHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                habit:'habit1',
                frequency: "Daily",
                streak: 0,
                isCompleted: false,
                timeofLastComplete: 1666862329297
            });
        })
    });

    describe('editHabit', () => {
        test("it should create a new habit for a particular user", async () => {
            jest.spyOn(Habit, 'find')
                .mockResolvedValue([{
                username: "username",
                password: "password",
                habits: []
                }])
            jest.spyOn(Habit, 'updateOne')
                .mockResolvedValue("updated")
            const mockReq = {
                params: { username: "username"},
                body: {habit: "habit1", frequency: "Daily"}
            }
            await habitsController.editHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith("updated");
        })
    })


    describe('deleteHabit', () => {
        test("it should delete a habit for a particular user", async () => {
            jest.spyOn(Habit, 'find')
                .mockResolvedValue([{
                username: "username",
                password: "password",
                habits: [{habit: "habit1"}]
                }])
            jest.spyOn(Habit, 'updateOne')
                .mockResolvedValue("updated")
            const mockReq = {
                params: { username: "username", id: 0},
            }
            await habitsController.deleteHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith("habit deleted");
        })
    })

    describe('completed', () => {
        test("it should mark a habit as completed", async () => {
            jest.spyOn(Habit, 'find')
                .mockResolvedValue([{
                username: "username",
                password: "password",
                habits: [{
                    habit: "habit1",
                    frequency: "Daily",
                    streak: 0,
                    isCompleted: false,
                    timeofLastComplete: 1666862319297
                    }]
                }])
            jest.spyOn(Habit, 'updateOne')
                .mockResolvedValue("updated")
            const mockReq = {
                params: { username: "username", id: 0},
                body: {frequency: "Daily"}
            }
            await habitsController.completed(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith("updated");
        })
    })

    describe('frequency', () => {
        test("it updates a habit's frequency", async () => {
            jest.spyOn(Habit, 'find')
                .mockResolvedValue([{
                username: "username",
                password: "password",
                habits: [{
                    habit: "habit1",
                    frequency: "Daily",
                    streak: 0,
                    isCompleted: false,
                    timeofLastComplete: 1666862319297
                    }]
                }])
            jest.spyOn(Habit, 'updateOne')
                .mockResolvedValue("updated")
            const mockReq = {
                params: { username: "username", id: 0},
                body: {frequency: "Weekly"}
            }
            await habitsController.frequency(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith("updated");
        })
    })
})
