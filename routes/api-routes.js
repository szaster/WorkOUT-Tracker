const Workout = require("../models/workout.js");

module.exports = (app) => {
  //get last workout
  app.get("api/workouts", async (req, res) => {
    const workout = await Workout.find({});
    res.json(workout);
  });
};
