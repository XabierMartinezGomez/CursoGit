const express = require('express');
const router = express.Router();
const {getEvents, getEventById,createEvent, updateEvent, deleteEvent, upcoming, dateRange} = require("../../controllers/eventController");
const {checkToken} = require("../../middelware/auth");

router.post('/createEvents', checkToken,createEvent);
router.get('/events/upcoming', upcoming);
router.get('/events/date', dateRange);
router.get('/events/:id', getEventById);
router.put('/events/:id', checkToken,updateEvent);
router.delete('/events/:id', checkToken,deleteEvent);
router.get('/events', getEvents);

module.exports = router;