const db = require("../models/workout.js");

module.exports = (app) => {
  // Return array with the last workout in it. If no workouts are found, array will be empty.
  app.get("/api/workouts/latest", async (req, res) => {
    // find latest workout
    const workouts = await db.Workout.find().sort({ day: -1 }).limit(1);
    res.json(workouts);
  });

  //create a new Workout
  app.post("/api/workouts", (req, res) => {
    // this is not yet implemented
    res.status(501).end();
  });
};
