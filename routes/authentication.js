const express = require('express');
const router =express.Router(); 
const validateToken = require('../middleware/validate');


router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);


module.exports = router;