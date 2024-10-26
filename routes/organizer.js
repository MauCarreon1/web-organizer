const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizer.controller');

router.get('/greeting/:day', (req, res) => {
    const day = req.params.day;
    const greeting = organizerController.getGreeting(day);
    res.json({ greeting });
});

router.get('/tasks', organizerController.taskLists);
router.post('/tasks', organizerController.createTask);
router.patch('/tasks/:id/finish', organizerController.finishTask);
router.delete('/tasks/:id', organizerController.deleteTask);

module.exports = router;
