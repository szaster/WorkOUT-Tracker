async function initWorkout() {
  const workouts = await API.getLastWorkout();
  if (workouts.length > 0) {
    const lastWorkout = workouts[0];

    // add id of the last workout to the link for continuing workout button
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises),
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText();
  }
}

const initialExerciseTally = {
  totalWeight: 0,
  totalSets: 0,
  totalReps: 0,
  totalDistance: 0,
};

function sum(acc, exercise) {
  if (exercise.type === "resistance") {
    acc.totalWeight = acc.totalWeight + exercise.weight;
    acc.totalSets = acc.totalSets + exercise.sets;
    acc.totalReps = acc.totalReps + exercise.reps;
  } else if (exercise.type === "cardio") {
    acc.totalDistance = acc.totalDistance + exercise.distance;
  }
  return acc;
}

function tallyExercises(exercises) {
  return exercises.reduce(sum, initialExerciseTally);
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered",
  };

  Object.keys(summary).forEach((key) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!";

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
