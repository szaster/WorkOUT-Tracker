const db = require("../models/workout.js");

module.exports = (app) => {
  // Return array with the last workout in it. If no workouts are found, array will be empty.
  app.get("/api/workouts/latest", async (req, res) => {
    // find latest workout
    const workouts = await db.Workout.find().sort({ day: -1 }).limit(1);
    res.json(workouts);
  });

  //create a new Workout
  app.post("/api/workouts/", async (req, res) => {
    try {
      const result = await db.Workout.create(req.body);
      res.json(result);
    } catch {
      res.status(500).end();
    }
  });

  app.put("/api/workouts/:id", async (req, res) => {
    const id = req.params.id;
    const exercise = req.body;
    try {
      const result = await db.Workout.updateOne(
        { _id: id },
        { $push: { exercises: exercise } }
      );
      if (result.ok === 1) {
        res.status(200).end();
      } else {
        res.status(500).end();
      }
    } catch {
      res.status(404).end();
    }
  });

  /**
   * Return statistics for days of the week ()
   */
  app.get("/api/workouts/range", async (req, res) => {
    try {
      // const query = {
      //   $expr: {
      //     $project: {
      //       dayOfWeek: { $dayOfWeek: "$day" },
      //     },
      //   },
      // };
      // this query returns non-aggregated data. Proper call should aggregate by
      // day of the week.
      const query = {};
      const result = await db.Workout.find(query);
      res.json(result);
    } catch {
      res.status(500).end();
    }
  });
};
