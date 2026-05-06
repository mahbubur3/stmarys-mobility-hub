import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="home-hero">
        <Container>
          <Row className="align-items-center">
            <Col md={9}>
              <h1 className="display-4 fw-bold outfit-text">Smart Travel Across London 🚌</h1>
              <p className="lead mt-3 inter-text">
                Plan routes, estimate fares, and check live transport updates in one place.
              </p>
              <div className="mt-4 d-flex flex-wrap gap-2">
                <Button as={Link} to="/finder">Plan Journey</Button>
                <Button as={Link} to="/updates" variant="outline-dark">Live Updates</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="page-section">
        <h2 className="text-center mb-4 outfit-text fw-bold">Features</h2>
        <Row className="inter-text">
          <Col md={4} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h5 className="fw-bold">Route Finder</h5>
                <p>Find journey options between two selected London locations.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h5 className="fw-bold">Fare Calculator</h5>
                <p>Estimate travel cost before you set off.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 app-panel text-center">
              <Card.Body>
                <h5 className="fw-bold">Live Updates</h5>
                <p>Check current service status for London transport lines.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
