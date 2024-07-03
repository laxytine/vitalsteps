import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import '../assets/styles/login.css';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false); // Changed initial state to false

  // State to manage loading state of the login process
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Validation to enable submit button when all fields are populated
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        // Check response status
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Login response data:', data); // Log response data for debugging

        if (data.access) {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            text: 'Welcome to VitalSteps!',
          });
        } else {
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Check your login details and try again.',
          });
        }
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An unexpected error occurred. Please try again later.',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // Check response status
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('User details response data:', data);
        setUser({
          id: data._id,
        });

        navigate('/'); // Example navigation after successful login
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An unexpected error occurred. Please try again later.',
        });
      });
  };

  return (
    <div className="login-container">
      <div className="left-column"></div>
      <div className="login-form">
        <h2 className="title text-center">
          <span className="text-warning">LOG</span>IN
        </h2>
        <Form onSubmit={authenticate}>
          <Form.Group>
            <Form.Label>EMAIL</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Button type="submit" className="btn btn-warning mt-3" disabled={!isActive || isLoading}>
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
