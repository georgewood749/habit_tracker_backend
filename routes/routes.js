const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/', (req, res) => {
    res.send('Create new account')
})

router.get('/', (req, res) => {
    res.send('Get all habits')
})

router.get('/:id', (req, res) => {
    res.send('Get one habit by ID')
})

router.patch('/:id', (req, res) => {
    res.send('Update habit by ID')
})

router.delete('/:id', (req, res) => {
    res.send('Delete habit by ID')
})
