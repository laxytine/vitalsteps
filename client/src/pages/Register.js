import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../assets/styles/register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setRegisterName] = useState('');
  const [email, setRegisterEmail] = useState('');
  const [password, setRegisterPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}users/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      const data = await response.json();
      Swal.fire({
        title: "Registration Successful",
        icon: "success",
        text: data.message || "You can now log in"
      });
      // Optionally, redirect to login page after successful registration
      // window.location.href = "/login";
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        icon: "error",
        text: error.message || 'Something went wrong during registration.'
      });
    }

    // Reset form fields after registration
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  return (
    <div className="register-container">
      <div className="left-column"></div>
      <div className="register-form">
          <h2 className="title text-center">
            <span className="text-warning">CREATE</span>ACCOUNT
          </h2>
        <Form onSubmit={handleRegister}>
          <Form.Group>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setRegisterName(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>EMAIL</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setRegisterEmail(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setRegisterPassword(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className='btn btn-warning mt-3'
            disabled={!(name && email && password)}>
            REGISTER
          </Button>
        </Form>
        <div className="login-link">
          Already have an account? <Link to="/login" className="text-warning">Log in here</Link>
        </div>
      </div>
    </div>
  );
}