const { Post } = require("../models");

const post_data = [
  {
    title: "MVC and SoC",
    content:
      "https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/",
    user_id: 1,
  },
  {
    title: "Freelance Cybersecurity Analyst",
    content:
      "https://thehackernews.com/2022/10/how-to-build-career-as-freelance.html",
    user_id: 2,
  },
  {
    title: "API resource list",
    content:
      "https://medium.com/codex/15-fun-and-interesting-apis-to-use-for-your-next-coding-project-in-2022-86a4ff3a2742",
    user_id: 2,
  },
];

const userSeeds = () => Post.bulkCreate(post_data);

module.exports = userSeeds;
