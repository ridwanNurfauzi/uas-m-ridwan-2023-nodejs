const router = require('express').Router();
const { users } = require('../controllers');

router.get('/', users.getUsers);

router.get('/:id', users.getUserByid);

router.post('/add', users.addUser);

module.exports = router;