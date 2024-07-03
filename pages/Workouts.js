import React, { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../assets/styles/workouts.css';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");

  // Fetch all workouts from API
  const retrieveAllWorkouts = () => {
    fetch("http://localhost:4000/workouts/getMyWorkouts", {
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
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          console.error("Expected an array but got:", data);
          setWorkouts([]);
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

  useEffect(() => {
    retrieveAllWorkouts();
  }, []);

  // Add new workout
  const addWorkout = () => {
    fetch("http://localhost:4000/workouts/addWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, duration, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: data.message,
          });
          retrieveAllWorkouts();
          setName("");
          setDuration("");
          setStatus("");
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.message,
          });
        }
      })
      .catch((error) => console.error("Error adding workout:", error));
  };

  // Delete workout
  const deleteWorkout = (id) => {
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
        fetch(`http://localhost:4000/workouts/deleteWorkout/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire({
                title: "Deleted!",
                text: data.message,
                icon: "success",
              });
              retrieveAllWorkouts();
            } else {
              Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => console.error("Error deleting workout:", error));
      }
    });
  };

  // Update workout details
  const updateDetails = (id) => {
    const workoutToUpdate = workouts.find((workout) => workout._id === id);
    fetch(`http://localhost:4000/workouts/updateWorkout/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name: workoutToUpdate.name, duration: workoutToUpdate.duration }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: data.message,
          });
          retrieveAllWorkouts();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.message,
          });
        }
      })
      .catch((error) => console.error("Error updating workout:", error));
  };

  // Update workout status
  const updateStatus = (id) => {
    const statusToEdit = workouts.find((workout) => workout._id === id);
    fetch(`http://localhost:4000/workouts/completedWorkoutStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(statusToEdit),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: data.message,
        });
        retrieveAllWorkouts();
      })
      .catch((error) => console.error("Error updating workout:", error));
  };

  return (
    <div>
      <div>
        <h2>User Details</h2>
        {/* Display user details */}
      </div>
      <div>
        <h2>Add Workout</h2>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={addWorkout}>
            Add Workout
          </Button>
        </Form>
      </div>
      <div>
        <h2>My Workouts</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id}>
                <td>{workout.name}</td>
                <td>{workout.duration}</td>
                <td>{workout.status}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      updateDetails(workout._id);
                    }}
                  >
                    Update Details
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() => {
                      updateStatus(workout._id);
                    }}
                  >
                    Update Status
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteWorkout(workout._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Workout;