const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const jwt = require('jsonwebtoken')

router.get('/', habitsController.getAll);
router.post('/', verifyToken, habitsController.create);

router.get('/:username', verifyToken, habitsController.show);
router.get('/:username/habits', habitsController.getHabits)
router.get('/:username/habits/:id', verifyToken, habitsController.getHabit)
router.patch('/:username/habits/:id', habitsController.editHabit)
router.patch('/:username/habits/:id/completed', habitsController.completed)
router.delete('/:username/habits/:id', habitsController.deleteHabit)

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    // console.log("authHeader", authHeader)
    // const token = authHeader && authHeader.split(' ')[1];
    console.log(token, "token");
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if (err) {
                res.status(403).json({err: 'invalid token'})
            } else {
                console.log('hello')
                next();
            }
        })
    } else {
        res.status(403).json({err: 'missing token'})
    }
}

module.exports = router;
