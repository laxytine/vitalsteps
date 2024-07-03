import Swal from "sweetalert2";

// Function to retrieve all workouts for the current user
export const retrieveAllWorkouts = (setWorkouts) => {
  fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to retrieve workouts");
      }
      return res.json();
    })
    .then((data) => {
      if (data.workouts && data.workouts.length > 0) {
        setWorkouts(data.workouts); // Here setWorkouts should be invoked with the fetched data
      } else {
        setWorkouts([]); // Handle case where no workouts are returned
      }
    })
    .catch((error) => {
      console.error("Error fetching workouts:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to retrieve workouts. Please try again later.",
      });
    });
};

// Function to add a new workout
export const addWorkout = (name, duration, status, setWorkouts) => {
  const newWorkout = {
    name: name,
    duration: duration,
    status: status,
  };

  fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newWorkout),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add workout");
      }
      return res.json();
    })
    .then((data) => {
      if (data.savedWorkout) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Workout added successfully",
        });
        retrieveAllWorkouts(setWorkouts); // Fetch updated list
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: data.error || "Failed to add workout",
        });
      }
    })
    .catch((error) => {
      console.error("Error adding workout:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to add workout. Please try again later.",
      });
    });
};

// Function to delete a workout
export const deleteWorkout = (id, setWorkouts) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${process.env.REACT_APP_API_URL}/workouts/deleteWorkout/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete workout");
          }
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            Swal.fire({
              title: "Deleted!",
              text: data.message,
              icon: "success",
            });
            retrieveAllWorkouts(setWorkouts); // Fetch updated list
          } else {
            Swal.fire({
              title: "Error",
              text: data.error || "Failed to delete workout",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting workout:", error);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to delete workout. Please try again later.",
          });
        });
    }
  });
};

// Function to update details of a workout
export const updateDetails = (id, updates, setWorkouts) => {
  fetch(`${process.env.REACT_APP_API_URL}/workouts/updateWorkout/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updates),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update workout details");
      }
      return res.json();
    })
    .then((data) => {
      if (data.updatedWorkout) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Workout details updated successfully",
        });
        retrieveAllWorkouts(setWorkouts); // Fetch updated list
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: data.error || "Failed to update workout details",
        });
      }
    })
    .catch((error) => {
      console.error("Error updating workout details:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to update workout details. Please try again later.",
      });
    });
};

// Function to update status of a workout
export const updateStatus = (id, updates, setWorkouts) => {
  fetch(`${process.env.REACT_APP_API_URL}/workouts/completedWorkoutStatus/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updates),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update workout status");
      }
      return res.json();
    })
    .then((data) => {
      if (data.updatedWorkout) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Workout status updated successfully",
        });
        retrieveAllWorkouts(setWorkouts); // Fetch updated list
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: data.error || "Failed to update workout status",
        });
      }
    })
    .catch((error) => {
      console.error("Error updating workout status:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to update workout status. Please try again later.",
      });
    });
};
