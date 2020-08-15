const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter workout type",
      },

      name: {
        type: String,
        trim: true,
        required: "Enter workout name",
      },

      duration: {
        type: Number,
        required: "Enter duration",
      },

      weight: {
        type: Number,
      },

      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },

      distance: {
        type: Number,
        required: "Enter distance",
      },
    },
  ],
  totalDuration: {
    type: Number,
    default: 0,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = { Workout };
