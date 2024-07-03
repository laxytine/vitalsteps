import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/home.css';

export default function Home() {
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
          {/* Button to navigate to register page */}
          <Link to="/register" className="btn btn-yellow">SIGN UP</Link>
          {/* Button to navigate to login page */}
          <Link to="/login" className="btn btn-yellow">LOGIN</Link>
        </div>
      </div>
    </div>
  );
}