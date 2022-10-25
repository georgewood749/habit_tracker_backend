const mongoose = require("mongoose");
const { connectDB, dropDB, dropCollections } = require("./setuptestdb");
const Habit = require("../../model/model");

const userData = {
  username: "testUser",
  password: "912345678",
  habits: [
    { id: 1, habit: "Eat", streak: 31, isCompleted: true },
    { id: 2, habit: "Sleep", frequency: "Daily", streak: 31, isCompleted: false },
    { id: 3, habit: "Gym", frequency: "Every 2 days", streak: 25, isCompleted: true }
  ]
};

describe("Habit Model", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it("should create & save user succesfully", async () => {
    const newUser = await Habit(userData);
    await newUser.setPassword(userData.password)
    await newUser.save();
    expect(newUser._id).toBeDefined();
    expect(newUser.username).toBe(userData.username);
    expect(newUser.salt).toBeDefined();
  });

  it("should return all habits succesfully", async () => {
    const allHabits = await Habit(userData);
    await allHabits.save();
    expect(allHabits.habits[0]._id).toBeDefined();
    expect(allHabits.habits).toHaveLength(3);
  });

  
});
