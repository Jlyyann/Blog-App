const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: [
            "Personal journal",
            "Food and recipes",
            "Travel",
            "Photography",
            "Business and news",
            "Creative writing",
            "Podcast"
        ],
        default: "Personal journal"
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    authorUsername: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [commentSchema],
        default: []
    }
});

module.exports = mongoose.model("Post", postSchema);
