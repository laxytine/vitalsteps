// UpdateModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateDetails, updateStatus } from "./WorkoutActions.js";

const UpdateModal = ({ id, name, duration, status, retrieveWorkouts, handleClose }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDuration, setUpdatedDuration] = useState(duration);
  const [updatedStatus, setUpdatedStatus] = useState(status);

  const handleUpdate = () => {
    if (status) {
      updateStatus(id, updatedStatus, retrieveWorkouts);
    } else {
      updateDetails(id, updatedName, updatedDuration, retrieveWorkouts);
    }
    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Workout Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout duration"
              value={updatedDuration}
              onChange={(e) => setUpdatedDuration(e.target.value)}
            />
          </Form.Group>
          {status && (
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
