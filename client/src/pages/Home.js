import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/home.css";
import Banner from "../assets/images/home.png";

const Home = () => {
  return (
    <div id="home">
      <div className="banner-container">
        <div className="banner-left">
          <h1 className="title">
            <strong>
              <span className="text-warning">VITAL</span>STEPS
            </strong>
          </h1>
          <p className="caption mt-4">MEASURE YOUR PROGRESS,</p>
          <p className="caption">MAXIMIZE YOUR RESULTS</p>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/register">
              <button className="btn btn-warning mr-2">SIGN UP</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-warning">LOGIN</button>
            </Link>
          </div>
        </div>
        <div className="banner-image">
          <img src={Banner} alt="banner" className="img-fluid" />
        </div>
      </div>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <p className="text-muted text-center">
            &copy; Designed by Justine Joy Canta. All rights reserved. 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
