import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../UserContext";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // Redirect logic based on user login status
  const renderNavLinks = () => {
    if (user.id) {
      // User is logged in
      return (
        <>
          <Nav.Link as={Link} to="/workouts" className={location.pathname === '/workouts' ? 'active' : ''}>WORKOUTS</Nav.Link>
          <Nav.Link as={Link} to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>LOGOUT</Nav.Link>
        </>
      );
    } else {
      // User is not logged in
      return (
        <>
          <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Nav.Link>
          <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>LOGIN</Nav.Link>
          <Nav.Link as={Link} to="/register" className={location.pathname === '/register' ? 'active' : ''}>REGISTER</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar expand="lg" className="pad">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="logo"
            height={50}
            width={100}
            className="img-fluid"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {renderNavLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
