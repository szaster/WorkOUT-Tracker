async function init() {
  if (location.search.split("=")[1] === undefined) {
    // fetch array with latest work out in it (if any)
    const workouts = await API.getLastWorkout();
    if (workouts.length > 0) {
      const workout = workouts[0];
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}

init();
