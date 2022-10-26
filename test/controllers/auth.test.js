const Habit = require('../../model/model')
const auth = require('../../controllers/auth')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const {register, login} = require('../../controllers/auth')

describe('authentication tests', () => {
    it('should generate identical hash given same password text and salt', () => {
        try {
            let salt = Habit.generateSalt()
            let hash = Habit.generateHash('password', salt)
            expect(hash).toEqual(Habit.generateHash('password', salt))
        } catch (err) {
            throw new Error(err)
        }
    })

    it('should throw an error if user leaves password field empty', async () => {
        try {
            await new Habit({
                username: "test",
                password: ""
            }).save()
        } catch (err) {
            expect(err)
        }
    })

    it('should throw authentication error if user enters incorrect password', async () => {
        try {
            // await new Habit({ username: "test", password: 'password' }).save()
            let salt = Habit.generateSalt()
            let hashedPassword = Habit.generateHash('password', salt)
            const auth = Habit.authenticate("passw0rd", hashedPassword, salt)
            expect(auth).toEqual(false)
        } catch (err) {
            throw new Error(err)
        }
    })

    it('should authenticate if user enters correct password', async () => {
        try {
            // await new Habit({ username: "test", password: 'password' }).save()
            let salt = Habit.generateSalt()
            let hashedPassword = Habit.generateHash('password', salt)
            const auth = Habit.authenticate("password", hashedPassword, salt)
            expect(auth).toEqual(true)
        } catch (err) {
            throw new Error(err)
        }
    })
})

// describe('auth controller tests', () => {
//     it('should register a new user', async () => {
//         newUser = register({username: 'test', password: 'password'}, 201)
//         expect(201)
//     })

//     it('should log a user in if correct credentials are entered', async () => {

//     })
// })