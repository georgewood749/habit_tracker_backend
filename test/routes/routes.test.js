const app = require('../../server');
const dbConfig = require('../config');
const request = require('supertest');

describe('habits endpoints', () => {
    let api;
    beforeAll(async () => {
        await dbConfig.connect();
    });

    beforeEach(async () => {
        await dbConfig.clear();
    });

    afterAll(async () => {
        await dbConfig.close();
    });

    test('should return a list of all users in database', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(6);
    });

    it('should create a new user on the database', async () => {
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(201);
    });

    it('should get the data associated with specific user', async () => {
        const res = await request(app).get('/test');
        expect(res.statusCode).toEqual(200);

    });

    it('should get data about all habits associated with selected user', async () => {
        const res = await request(app).get('/test/habits');
        expect(res.statusCode).toEqual(200);

    });

    it('should get data for specific habit for selected user', async () => {
        const res = await request(app).get('/test/habits/running');
        expect(res.statusCode).toEqual(200);

    });

    it('should update habit data in user data on database', async () => {
        const res = await request(app).patch('/test/habits/running');
        expect(res.statusCode).toEqual(200);

    });

    it('should delete habit from user in the database', async () => {
        const res = await request(app).delete('/test/habits/running');
        expect(res.statusCode).toEqual(204);

    });

        it('responds to invalid username with 404', (done) => {
        request(api).get('/users/invalidUsername').expect(404, done)
    })
})

// const index = require("../index");

// const request = require("supertest");
// const express = require("express");
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use("/", index);

// test("index route works", done => {
//   request(app)
//     .get("/")
//     .expect("Content-Type", /json/)
//     .expect({ name: "frodo" })
//     .expect(200, done);
// });

// test("testing route works", done => {
//   request(app)
//     .post("/test")
//     .type("form")
//     .send({ item: "hey" })
//     .then(() => {
//       request(app)
//         .get("/test")
//         .expect({ array: ["hey"] }, done);
//     });
// });

// https://www.theodinproject.com/lessons/nodejs-testing-routes-and-controllers