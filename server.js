const express = require("express");
const passport = require("./utils/passport");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(passport.initialize());
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/agileLearning",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
app.use(require("./routes/api-routes.js"));
require("dotenv").config();

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
