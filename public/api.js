const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts/latest");
    } catch (err) {
      console.log(err);
    }
    return await res.json();
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
