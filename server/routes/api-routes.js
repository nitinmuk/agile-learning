// Requiring our models and passport as we've configured it
const User = require("../models/user.js");
const passport = require("../utils/passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const path = require("path");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, sent a jwt token
router.post(
  "/api/login",
  passport.authenticate("local", { session: false }),
  (request, response) => {
    const token = jwt.sign({ id: request.user._id }, "jwt_secret");
    response.json({ token: token });
  }
);

// Route for signing up a user. The user's password is automatically hashed
// and stored securely thanks to how we configured our User Model.
// If the user is created successfully, send jwt token to client,
// otherwise send back an error
router.post("/api/signup", async ({ body }, response) => {
  try {
    const user = await User.create(body);
    const token = jwt.sign({ id: user._id }, "jwt_secret");
    response.status(201).json({ token });
  } catch (error) {
    console.log("Error", error);
    response.status(500).json("Couldn't create user");
  }
});

// Route for logging user out
router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting user to be used client side
router.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    if (!request.user) {
      response.json({});
    } else {
      response.json(request.user);
    }
  }
);

// Send every request to the React app
// Define any API routes before this runs
router.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
