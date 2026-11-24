const Post = require("../models/Post");
const mongoose = require("mongoose");
const { errorHandler } = require("../auth");

const allowedCategories = [
    "Personal journal",
    "Food and recipes",
    "Travel",
    "Photography",
    "Business and news",
    "Creative writing",
    "Podcast"
];

module.exports.getAllPosts = (req, res) => {
    const category = req.query.category;

    if (category && !allowedCategories.includes(category)) {
        return res.status(400).send({ message: "Please select a valid topic" });
    }

    const filter = category === "Personal journal"
        ? { $or: [{ category }, { category: { $exists: false } }] }
        : category
            ? { category }
            : {};

    return Post.find(filter).sort({ createdOn: -1 })
    .then(posts => res.status(200).send(posts))
    .catch(error => errorHandler(error, req, res));
};

module.exports.getPost = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid post ID" });
    }

    return Post.findById(req.params.id)
    .then(post => {
        if (post) {
            return res.status(200).send(post);
        } else {
            return res.status(404).send({ message: "Post not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.createPost = (req, res) => {
    if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).send({ message: "Post title is required" });
    } else if (!req.body.content || req.body.content.trim() === "") {
        return res.status(400).send({ message: "Post content is required" });
    } else if (req.body.category && !allowedCategories.includes(req.body.category)) {
        return res.status(400).send({ message: "Please select a valid topic" });
    }

    let newPost = new Post({
        title: req.body.title.trim(),
        content: req.body.content.trim(),
        category: req.body.category || "Personal journal",
        authorId: req.user.id,
        authorUsername: req.user.username
    });

    return newPost.save()
    .then(result => res.status(201).send({
        message: "Post created successfully",
        post: result
    }))
    .catch(error => errorHandler(error, req, res));
};

module.exports.updatePost = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid post ID" });
    } else if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).send({ message: "Post title is required" });
    } else if (!req.body.content || req.body.content.trim() === "") {
        return res.status(400).send({ message: "Post content is required" });
    } else if (req.body.category && !allowedCategories.includes(req.body.category)) {
        return res.status(400).send({ message: "Please select a valid topic" });
    }

    return Post.findById(req.params.id)
    .then(post => {
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        } else if (post.authorId.toString() !== req.user.id) {
            return res.status(403).send({ message: "You can only update your own post" });
        } else {
            post.title = req.body.title.trim();
            post.content = req.body.content.trim();
            post.category = req.body.category || post.category || "Personal journal";

            return post.save()
            .then(result => res.status(200).send({
                message: "Post updated successfully",
                post: result
            }))
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deletePost = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid post ID" });
    }

    return Post.findById(req.params.id)
    .then(post => {
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        } else if (post.authorId.toString() !== req.user.id && req.user.isAdmin !== true) {
            return res.status(403).send({ message: "Action Forbidden" });
        } else {
            return Post.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send({ message: "Post deleted successfully" }))
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.addComment = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid post ID" });
    } else if (!req.body.comment || req.body.comment.trim() === "") {
        return res.status(400).send({ message: "Please write a comment" });
    }

    return Post.findById(req.params.id)
    .then(post => {
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        } else {
            post.comments.push({
                userId: req.user.id,
                username: req.user.username,
                comment: req.body.comment.trim()
            });

            return post.save()
            .then(result => res.status(201).send({
                message: "Comment added successfully",
                post: result
            }))
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};
