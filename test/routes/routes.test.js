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
        const res = await request(dbConfig).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(6);
    });

    it('should post new user to the database', async () => {
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(6);
    });
})

// describe('API server', () => {
//     let api;

//     beforeAll( async () => {
//         api = app.listen(5000, () => {
//             console.log(`Example app listening on port 5000`)
//         })
//     })

//     afterAll(async (done) => {
//         console.log('Stopping test server');
//         api.close(done)
//     })

//     it('responds to get / with status of 200', (done) => {
//         request(api).get('/').expect(200, done);
//     })

//     it('retrieves all cats', (done) => {
//         request(api).get('/cats').expect(200, done);
//     })

//     it('retrieves a specific cat', (done) => {
//         request(api).get('/cats/2').expect(200)
//             .expect({
//                 id: 2,
//                 name: 'Zelda',
//                 image: '../assets/cat2.png'
//             }, done)
//     })

//     it('responds to invalid methods with 405', (done) => {
//         request(api).post('/cats').expect(405, done)
//     })

//     it('responds to invalid id with 404', (done) => {
//         request(api).post('/cats/5').expect(404, done)
//     })
// })