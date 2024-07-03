import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddWorkoutModal = ({ showModal, setShowModal, name, setName, duration, setDuration, status, setStatus, addWorkout }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="warning" onClick={addWorkout}>
          Add Workout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWorkoutModal;
