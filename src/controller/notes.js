const Note = require('../model/Notes');
const { validationResult } = require('express-validator');

exports.addNote = async (request, response) => {
    try {

        const { title, description, tag } = request.body;
        const userId = request.user._id

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const newNote = new Note({ userId, title, description, tag });
        const saveNote = await newNote.save();



        return response.status(200).json({
            success: true,
            message: "success",
            data: saveNote
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

exports.loadNoteById = async (request, response) => {
    try {

        const notes = await Note.findById({ _id: request.params.id }).lean();
        if (!notes) {
            return response.status(404).json({
                success: false,
                message: "Not Found."
            })
        }



        return response.status(200).json({
            success: true,
            message: "success",
            data: notes
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}



exports.loadNotes = async (request, response) => {
    try {

        const userId = request.user._id;
        const notes = await Note.find({ userId }).lean();
        if (notes.length === 0) {
            return response.status(200).json({
                success: true,
                message: "Notes not found",
            })
        }



        return response.status(200).json({
            success: true,
            message: "success",
            data: notes
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

exports.updateNote = async (request, response) => {
    try {

        const userId = request.user._id;

        const findNote = await Note.findById({ _id: request.params.id }).lean();

        if (findNote.userId.toString() !== userId.toString()) {
            return response.status(401).json({
                success: false,
                message: "Not Allowed."
            })
        }

        const updateNote = await Note.findByIdAndUpdate({ _id: findNote._id }, request.body, { new: true })



        return response.status(200).json({
            success: true,
            message: "success",
            data: updateNote
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

exports.deleteNote = async (request, response) => {
    try {

        const userId = request.user._id;

        const findNote = await Note.findById({ _id: request.params.id }).lean();

        if (!findNote) {
            return response.status(404).json({
                success: false,
                message: "Note not Found."
            })
        }

        if (findNote.userId.toString() !== userId.toString()) {
            return response.status(401).json({
                success: false,
                message: "Not Allowed."
            })
        }

        await Note.findByIdAndDelete({ _id: findNote._id })



        return response.status(200).json({
            success: true,
            message: "Note deleted successfully.",
        })

    } catch (error) {
        console.log("Error", error);
        return response.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}