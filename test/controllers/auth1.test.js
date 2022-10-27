const authController = require('../../controllers/auth')
const Habit = require('../../model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe("auth controller", () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('register', () => {
        test('it adds a user with a 201 status code', async () => {
            jest.spyOn(Habit, 'create')
                 .mockResolvedValue(['created']);
            const mockReq = {body: {username: "username", password: "password"}}
            await authController.register(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({msg: 'User created'});
        })
    });

    // describe('login', () => {
    //     test('it checks a users details with a 200 status code', async () => {
    //         jest.spyOn(Habit, 'find')
    //              .mockResolvedValue([{username: "username", password: "password"}]);
    //         jest.spyOn(bcrypt, 'compare')
    //             .mockResolvedValue(true)
    //         jest.spyOn(jwt, "")
    //         const mockReq = {body: {username: "username", password: "password"}}
    //         await authController.login(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith({
    //             success: true,
    //             token: token
    //         });
    //     })
    // });
})
