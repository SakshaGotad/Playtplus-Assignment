const express = require('express');
const router = express.Router();
const EventController = require('../controller/authController');
const validateToken = require('../middleware/validate');

router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);
router.post('/events', validateToken, EventController.createEvent);
router.put('/events/:id', validateToken, EventController.updateEvent);
router.delete('/events/:id', validateToken, EventController.deleteEvent);

module.exports = router;