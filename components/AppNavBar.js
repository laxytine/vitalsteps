import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  if (!user.id) {
    navigate("/login");
  }

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
            {user.id && <Nav.Link as={Link} to="/workouts">WORKOUTS</Nav.Link>}
            {user.id ? (
              <Nav.Link as={Link} to="/logout">LOGOUT</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/">HOME</Nav.Link>
                <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
                <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}