const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "general"
    },
},
    {
        timestamps: true
    }
)

const Notes = new mongoose.model("Notes", NotesSchema);

module.exports = Notes;