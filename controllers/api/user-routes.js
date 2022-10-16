const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GRAB EVRY USER
router.get("/", async (req, res) => {
  // res.send("hello world");
  const dbUserData = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Post,
        attributes: ["id", "comment", "created_at", "updated_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "created_at", "updated_at"],
      },
    ],
  });
  const users = dbUserData.map((user) => user.get({ plain: true }));
  res.json(users);
});

// GRAB USER BVY ID
router.get("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    const user = dbUserData.get({ plain: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
