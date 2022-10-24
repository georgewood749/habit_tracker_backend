const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')


// router.post('/', (req, res) => {
//     res.send('Create new account')
// })

router.get('/', habitsController.getAll);

router.get('/:id', habitsController.show);

// router.patch('/:id', (req, res) => {
//     res.send('Update habit by ID')
// })

// router.delete('/:id', (req, res) => {
//     res.send('Delete habit by ID')
// })

module.exports = router;
