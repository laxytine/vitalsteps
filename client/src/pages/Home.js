import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import '../assets/styles/home.css';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      {/* Left Column */}
      <div className="left-column"></div>

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1 className="title text-center">
            <span className="text-warning">VITAL</span>STEPS
          </h1>
          <p className="p pt-2 text-center">Measure Progress, </p>
          <p className="p text-center">Maximize Results</p>
        </div>
        <div className="container text-center mt-4">
          {user.id ? (
            // Render WORKOUTS button if user is logged in
            <Link to="/workouts" className="btn btn-yellow">WORKOUTS</Link>
          ) : (
            // Render SIGN UP and LOGIN buttons if user is not logged in
            <>
              <Link to="/register" className="btn btn-yellow">SIGN UP</Link>
              <Link to="/login" className="btn btn-yellow">LOGIN</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
