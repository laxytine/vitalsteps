import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/error.css";

function ErrorPage() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <Button variant="warning" as={Link} to="/">
        Back to Home
      </Button>
    </Container>
  );
}

export default ErrorPage;