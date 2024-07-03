import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import '../assets/styles/login.css';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Login response data:', data); 
        if (data.access) {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);
        } else {
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Check your login details and try again.',
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error during authentication:', error); 
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An unexpected error occurred. Please try again later.',
        });
        setIsLoading(false);
      });
  }

  const retrieveUserDetails = (token) => {
    fetch('http://localhost:4000/users/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User details response data:', data); 
        setUser({
          id: data.user.id,
        });
        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
          text: 'Welcome to VitalSteps!',
        }).then(() => {
          navigate('/workouts');
        });
      })
      .catch((error) => {
        console.error('Error retrieving user details:', error); 
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to retrieve user details.',
        });
        setIsLoading(false);
      });
  };

  const isDisabled = !email || !password || isLoading;

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
            />
          </Form.Group>
          <Button type="submit" className="btn btn-warning mt-3" disabled={isDisabled}>
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </Button>
        </Form>
      </div>
    </div>
  );
}