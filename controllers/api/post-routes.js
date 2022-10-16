const router = require("express").Router();
const { zUser, Post, Comment, User } = require("../../models");

// GRAB ALL USERS
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
        included: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: ["id", "comment", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      },
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
