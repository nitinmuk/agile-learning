const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required"
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required"
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required"
  },
  password: {
    type: String,
    required: "password is required"
  },
  userType: {
    type: String,
    required: "user type is required"
  },
  userProfileLink: {
    type: String
  }
});
//This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.path("email").validate(async function(value) {
  try {
    const count = await this.model("User").countDocuments({ email: value });
    return count === 0 ? true : false;
  } catch (error) {
    console.log("Error", error);
    return;
  }
}, "Email already exists");

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  return next();
});

/*UserSchema.methods.login = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, error => error ? reject(error) : resolve(this));
  })
}*/

const User = mongoose.model("User", UserSchema);

module.exports = User;
