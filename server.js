const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const server = express()
server.use(express.json());

let cors = require("cors")
server.use(cors())

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qdvvhyb.mongodb.net/?retryWrites=true&w=majority`)
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.a7xqgeo.mongodb.net/?retryWrites=true&w=majority`);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.a7xqgeo.mongodb.net/?retryWrites=true&w=majority`)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Connected successfully to database"));

const routes = require('./routes/routes');
server.use('/habits', routes);
const authRoutes = require('./routes/auth');
server.use('/auth', authRoutes);

server.get('/', (req, res) => {
    res.send('Welcome to the DaBoiz Habit Tracker!')
})


// const bodyParser = require('body-parser')
// server.use(bodyParser.json())

// server.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     next();
// });

module.exports = server;
