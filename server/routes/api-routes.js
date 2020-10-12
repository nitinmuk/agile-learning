// Requiring our models and passport as we've configured it
const User = require("../models/user.js");
const LearningStory = require("../models/learningStory.js");
const passport = require("../utils/passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, sent a jwt token
router.post("/api/login", (request, response, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) {
      console.log(error);
    }
    if (info !== undefined) {
      console.log(info.message);
      response.status(401).send(info.message);
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      response.json({ token, student: user.student });
    }
  })(request, response, next);
});

// Route for signing up a user. The user's password is automatically hashed
// and stored securely thanks to how we configured our User Model.
// If the user is created successfully, send jwt token to client,
// otherwise send back an error
router.post("/api/signup", async ({ body }, response) => {
  try {
    const user = await User.create(body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    response.status(201).json({ token, student: user.student });
  } catch (error) {
    console.log("Error", error);
    response.status(500).json("Couldn't create user");
  }
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

/**
 * route to create learning story for instructors
 */
router.post("/api/learningStory", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send(info.message);
      } else {
        try {
          const body = request.body;
          const learningStory = await LearningStory.create({
            ...body,
            instructor: user._id
          });
          await User.findByIdAndUpdate(
            user._id,
            { $push: { learningStories: learningStory._id } },
            { new: true }
          );
          response.status(201).end();
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

// Send every request to the React app
// Define any API routes before this runs
router.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
