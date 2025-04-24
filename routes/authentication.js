const express = require('express');
const router =express.Router(); 
const validateToken = require('../middleware/validate');
const authControllers = require('../controller/authController');

router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);


module.exports = router;