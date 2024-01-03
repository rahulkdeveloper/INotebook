const express = require('express');
const router = express.Router();
const { addNote, loadNotes, updateNote, deleteNote, loadNoteById } = require('../controller/notes');
const { auth } = require('../middleware/auth');
const { body } = require('express-validator');

router.get('/load-notes', auth, loadNotes);
router.get('/loadById/:id', auth, loadNoteById);

router.post('/add-notes', auth,
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 3 }),
    addNote)

router.put('/update/:id', auth, updateNote);
router.delete('/delete/:id', auth, deleteNote);

module.exports = router;