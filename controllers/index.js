const router = require("express").Router();

// const apiRoutes = require("/api");
// const homeRoutes = require("/home-routes.js");
// const dashboardRoutes = require("/dashboard-routes.js");

// router.use("/api", apiRoutes);
// router.use("/", homeRoutes);
// router.use("/dashboard", dashboardRoutes);

// //TODO: USED TO CREATE HANDSHAKE AND WILL BE ERASED ONCE APIS ARE LINKED
router.use(
  "/",
  router.get("/", (req, res) => {
    res.send("Hello World!");
  })
);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
