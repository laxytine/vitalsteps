import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/images/home.png";
import "../assets/styles/home.css";

const Banner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6 text-center">
            <h1 className="title display-4"><strong><span className="text-warning">VITAL</span>STEPS</strong></h1>
            <p className="lead mt-4">MEASURE YOUR PROGRESS,</p>
            <p className="lead">MAXIMIZE YOUR RESULTS</p>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/register">
                <button className="btn btn-warning mr-2">SIGN UP</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-warning">LOGIN</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <p className="text-muted text-center">&copy; Designed by Justine Joy Canta. All rights reserved. 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Banner;