const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');
const validateToken = require('../middleware/validate');

router.get('/all-events', EventController.getAllEvent);
router.get('/events/:id', EventController.getEventById);
router.post('/create-event', validateToken, EventController.createEvent);
router.put('/update-event/:id', validateToken, EventController.updateEvent);
router.delete('/delete-event/:id', validateToken, EventController.deleteEvent);

module.exports = router;