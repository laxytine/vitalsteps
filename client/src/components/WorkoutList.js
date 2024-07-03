import React, { useState } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateDetails, updateStatus, deleteWorkout } from "../components/WorkoutActions";
import UpdateModal from "./UpdateModal";

const WorkoutList = ({ workouts, retrieveWorkouts, setWorkouts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleUpdateDetails = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleUpdateStatus = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
  };

  const handleDeleteWorkout = (id) => {
    deleteWorkout(id, setWorkouts);
  };

  // Function to format date string to display date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    
    const options = {
      year: "numeric",
      month: "short", // Use "short" for abbreviated month (e.g., Jan)
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    return date.toLocaleString("en-US", options);
  };

  return (
    <div>
      <Table className="table width-100">
        <thead className="text-center text-uppercase">
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{formatDateTime(workout.dateAdded)}</td>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td>{workout.status}</td>
              <td>
                {/* Choose Action Dropdown */}
                <DropdownButton className="ml-2" variant="warning" title="Choose Action">
                  <Dropdown.Item onClick={() => handleUpdateDetails(workout)}>
                    Update
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDeleteWorkout(workout._id)}>
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && selectedWorkout && (
        <UpdateModal
          id={selectedWorkout._id}
          name={selectedWorkout.name}
          duration={selectedWorkout.duration}
          status={selectedWorkout.status}
          retrieveWorkouts={retrieveWorkouts}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default WorkoutList;
