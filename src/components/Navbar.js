import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="outfit-text">
        <Navbar.Brand as={Link} to="/">Plann&gooo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/options">Options</Nav.Link>
            <Nav.Link as={Link} to="/fare">Fare</Nav.Link>
            <Nav.Link as={Link} to="/finder">Route</Nav.Link>
            <Nav.Link as={Link} to="/updates">Updates</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;