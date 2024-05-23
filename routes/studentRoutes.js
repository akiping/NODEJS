// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticate = require('../middleware/authenticate');

router.get('/students', authenticate, studentController.getAllStudents);
router.get('/students/:id', authenticate, studentController.getStudentById);
router.post('/students', authenticate, studentController.createStudent);
router.put('/students/:id', authenticate, studentController.updateStudent);
router.patch('/students/:id', authenticate, studentController.patchStudent);
router.delete('/students/:id', authenticate, studentController.deleteStudent);

module.exports = router;
