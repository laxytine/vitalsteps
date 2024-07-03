import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../assets/styles/workouts.css"; // Import your workouts-specific CSS file

import WorkoutList from "../components/WorkoutList";
import AddWorkoutModal from "../components/AddWorkoutModal";
import UserDetails from "../components/UserDetails";

import { retrieveAllWorkouts, addWorkout, deleteWorkout, updateDetails, updateStatus } from "../components/WorkoutActions";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    retrieveAllWorkouts(setWorkouts);
  }, []);

  const handleAddWorkout = () => {
    addWorkout(
      name,
      duration,
      status,
      () => {
        retrieveAllWorkouts(setWorkouts);
        setShowModal(false);
        setName("");
        setDuration("");
        setStatus("");
      },
      () => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to add workout. Please try again later.",
        });
      }
    );
  };

  const handleDeleteWorkout = (id) => {
    deleteWorkout(
      id,
      () => {
        retrieveAllWorkouts(setWorkouts);
      },
      () => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to delete workout. Please try again later.",
        });
      }
    );
  };

  const handleUpdateDetails = (id) => {
    updateDetails(
      id,
      { name, duration },
      () => {
        retrieveAllWorkouts(setWorkouts);
      },
      () => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to update workout details. Please try again later.",
        });
      }
    );
  };

  const handleUpdateStatus = (id) => {
    updateStatus(
      id,
      { status },
      () => {
        retrieveAllWorkouts(setWorkouts);
      },
      () => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to update workout status. Please try again later.",
        });
      }
    );
  };

  return (
    <div className="Workout container mt-5">
      <UserDetails />

      <Button variant="warning" onClick={() => setShowModal(true)}>
        Add Workout
      </Button>

      <AddWorkoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={name}
        setName={setName}
        duration={duration}
        setDuration={setDuration}
        status={status}
        setStatus={setStatus}
        addWorkout={handleAddWorkout}
      />

      <h2>My Workouts</h2>
      <WorkoutList
        workouts={workouts}
        onDelete={handleDeleteWorkout}
        onUpdateDetails={handleUpdateDetails}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Workout;
