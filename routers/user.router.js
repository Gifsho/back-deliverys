const router = require('express').Router();
const UserController = require("../controller/user.controller");

router.get('/users', UserController.getAll);
router.post('/registration',UserController.register);
router.post('/login',UserController.login);

module.exports = router;