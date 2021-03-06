// Requiring our models and passport as we've configured it
const User = require("../models/user.js");
const LearningStory = require("../models/learningStory.js");
const passport = require("../utils/passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const { DateTime } = require("luxon");
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
      response.status(401).send("Authentication Failed");
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
  async (request, response) => {
    if (!request.user) {
      response.json({});
    } else {
      const populatedUser = await User.findById(request.user._id).populate({
        path: request.user.student ? "subscribedStories" : "learningStories"
      });
      response.json(populatedUser);
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
        response.status(401).send("Authentication Failed");
      } else {
        try {
          const body = request.body;
          const learningStory = await LearningStory.create({
            ...body,
            instructor: user._id,
            creationDate: Date.now(),
            lastUpdateTime: Date.now()
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

/**
 * route to update learning story corresponding to given id
 */
router.put("/api/learningStory/:id", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send("Authentication Failed");
      } else {
        try {
          const body = request.body;
          await LearningStory.updateOne(
            {
              _id: request.params.id
            },
            {
              ...body,
              lastUpdateTime: Date.now()
            }
          );
          response.status(204).end();
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to fetch learning stories created by current user
 */
router.get("/api/learningStories", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send("Authentication Failed");
      } else {
        try {
          const learningStories = await LearningStory.find({
            _id: {
              $in: user.learningStories
            }
          });
          learningStories.sort((ls1, ls2) => {
            const val = parseInt(ls2.lastUpdateTime) - parseInt(ls1.lastUpdateTime);
            return val;
          });
          response.json(learningStories);
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to delete learning story for instructors
 * removes learning story and update all users reference
 * i.e. subscribers as well as publisher user
 */
router.delete("/api/learningStory/:id", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send("Authentication Failed");
      } else {
        try {
          await LearningStory.findByIdAndRemove(
            request.params.id,
            (error, ls) => {
              if (error) {
                console.log("Error", error);
              } else {
                const userIds = ls.subscribers;
                if (userIds && userIds.length) {
                  // updating other user without waiting for it to finish
                  // as this action is not relevant for current user.
                  userIds.forEach(userId => {
                    //@TODO notify each subscribed user
                    //about the story getting removed
                    User.findByIdAndUpdate(
                      userId,
                      { $pull: { subscribedStories: ls._id } },
                      { new: true }
                    );
                  });
                }
              }
            }
          );
          await User.findByIdAndUpdate(
            user._id,
            { $pull: { learningStories: request.params.id } },
            { new: true }
          );
          response.status(204).end();
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to fetch available learning stories for current
 * user to subscribe. it also prepopulates instructor details
 * in each learning story
 */
router.get("/api/availableLearningStories", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send("Authentication Failed");
      } else {
        try {
          const learningStories = await LearningStory.find({
            status: "published",
            _id: {
              $nin: user.subscribedStories
            }
          }).populate({ path: "instructor" });
          learningStories.sort((ls1, ls2) => {
            const val =
              DateTime.fromISO(ls1.startDate).toMillis() -
              DateTime.fromISO(ls2.startDate).toMillis();
            return val;
          });
          response.json(learningStories);
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to fetch all learning stories subscribed by current
 * user. it also prepopulates instructor details
 * in each learning story
 */
router.get("/api/subscribedLearningStories", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log("Error: ", error);
        if (info !== undefined) {
          console.log("Message: ", info.message);
        }
        response.status(401).send("Authentication Failed");
      } else {
        try {
          const learningStories = await LearningStory.find({
            _id: {
              $in: user.subscribedStories
            }
          }).populate({ path: "instructor" });
          learningStories.sort((ls1, ls2) => {
            const val =
              DateTime.fromISO(ls1.startDate).toMillis() -
              DateTime.fromISO(ls2.startDate).toMillis();
            return val;
          });
          response.json(learningStories);
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to let user subscribe to given learning story
 * i.e. update relevant fields in User and learning story
 * objects.
 */
router.put("/api/subscribeLearningStory/:id", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
      }
      if (info !== undefined) {
        console.log(info.message);
        response.status(401).send("Authentication Failed");
      } else {
        try {
          await LearningStory.findByIdAndUpdate(
            request.params.id,
            { $push: { subscribers: user._id } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            user._id,
            { $push: { subscribedStories: request.params.id } },
            { new: true }
          );
          response.status(204).end();
        } catch (error) {
          console.log("Error", error);
          response.status(500).end();
        }
      }
    }
  )(request, response, next);
});

/**
 * route to let user unsubscribe from a given learning story
 * i.e. update relevant fields in User and learning story
 * objects.
 */
router.put("/api/unsubscribeLearningStory/:id", (request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error) {
        console.log(error);
        if (info !== undefined) {
          console.log(info.message);
        }
        response.status(401).send("Authentication Failed");
      } else {
        try {
          await LearningStory.findByIdAndUpdate(
            request.params.id,
            { $pull: { subscribers: user._id } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            user._id,
            { $pull: { subscribedStories: request.params.id } },
            { new: true }
          );
          response.status(204).end();
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
  response.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
