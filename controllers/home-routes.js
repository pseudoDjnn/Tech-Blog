const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const Url = require("url");

// router.get("/", (req, res) => {
//   res.send("hello world");
// });

// GRAB ALL ROUTES FOR HOMEPAGE
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment"],
        },
      ],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    const x = Url.parse(req._parsedOriginalUrl, true);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      active_home: x.path === "/",
      home: true,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// LOGIN
router.get("/login", (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("login");
});

module.exports = router;
