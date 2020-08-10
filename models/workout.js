const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  date: { type: Date, default: Date.now },

  exercise: [],
  // {
  //   type: String,
  //   name: String,
  //   duration: String,
  //   weight: String,
  //   reps: String,
  //   sets: String,
  // },

  completed: {
    type: Boolean,
    default: false,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
