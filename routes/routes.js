const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')
const jwt = require('jsonwebtoken')

router.post('/', verifyToken, habitsController.create);
router.get('/', habitsController.getAll);
router.get('/:username',verifyToken, habitsController.show);


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
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
