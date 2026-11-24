const express = require("express");
const postController = require("../controllers/post");
const auth = require("../auth");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", auth.verify, postController.createPost);
router.patch("/:id", auth.verify, postController.updatePost);
router.delete("/:id", auth.verify, postController.deletePost);
router.post("/:id/comments", auth.verify, postController.addComment);

module.exports = router;
