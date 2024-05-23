// controllers/studentController.js
const Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const result = await Student.create(req.body);
        res.status(201).json({ message: 'Student created', studentId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const result = await Student.update(req.params.id, req.body);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.patchStudent = async (req, res) => {
    try {
        const result = await Student.patch(req.params.id, req.body);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const result = await Student.delete(req.params.id);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student deleted' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
