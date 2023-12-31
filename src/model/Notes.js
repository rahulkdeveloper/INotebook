const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tage: {
        type: String,
        default: "general"
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
)

const User = new mongoose.model("User", UserSchema);

module.exports = User;