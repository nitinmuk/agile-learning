const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LearningStorySchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  creationDate: {
    type: Date,
    default: new Date()
  },
  content: {
    type: String,
    trim: true
  },
  sessionCount: {
    type: Number
  },
  startDate: {
    type: Date
  },
  status: {
    type: String,
    default: "draft"
  },
  subject: {
    type: String
  },
  notes: {
    type: String
  },
  sessionLink: {
    type: String
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  subscribers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const LearningStory = mongoose.model("LearningStory", LearningStorySchema);

module.exports = LearningStory;
