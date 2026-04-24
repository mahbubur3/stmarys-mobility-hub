import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div style={{ background: "#f8f9fa", padding: "80px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold outfit-text">Smart Travel Across London</h1>
              <p className="lead mt-3 inter-text">Plan routes, calculate fares, and check live transport updates all in one place.</p>
              <div className="mt-4">
                <Button as={Link} to="/finder" className="me-3">Plan Journey</Button>
                <Button as={Link} to="/updates" variant="outline-dark">Live Updates</Button>
              </div>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <div style={{ fontSize: "100px" }}>🚆</div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-5">
        <h2 className="text-center mb-4 outfit-text fw-bold">Features</h2>
        <Row className="inter-text">
          <Col md={4} className="mb-4">
            <Card className="p-3 shadow text-center">
              <h5 className="fw-bold">Route Finder</h5>
              <p>Find the best routes between any two locations.</p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="p-3 shadow text-center">
              <h5 className="fw-bold">Fare Calculator</h5>
              <p>Estimate travel cost instantly.</p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="p-3 shadow text-center">
              <h5 className="fw-bold">Live Updates</h5>
              <p>Check real-time transport status in London.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;