const request = require("supertest");
const { connect, clear, close } = require("../config");
const { server } = require("../../server");
const agent = request.agent(server);

describe("habits endpoints", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clear();
  });

  afterAll(async () => {
    await close();
  });

  it("stores a new user to the database", async () => {
    agent
      .post("/register")
      .send({ username: "testuser", password: "testpw" })
      .expect(201)
      .then((res) => {
        expect(res.body._id).toBeTruthy();
        done();
      });
  }, 10000);

  // it("store a new user to the database", async () => {
  //   agent
  //     .post("/register")
  //     .send({ username: "testuser", password: "testpw" })
  //     .expect(201)
  //     .then((res) => {
  //       expect(res.body._id).toBeTruthy();
  //       done();
  //     });
  // }, 10000);
});

