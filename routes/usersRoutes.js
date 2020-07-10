const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/create', usersController.create);
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);

module.exports = router;