const router = require('express').Router();
const management = require("../controllers/management.controller");

router.get('/users', management.searchUsers); 
router.get('/riders', management.getAllRiders); 


module.exports = router;

