import options from "../data/options";
import { Container, Row, Col, Card } from "react-bootstrap";

function TravelOptions() {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 outfit-text text-center fw-bold">Travel Options</h2>
      <Row>
        {options.map((option, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4 inter-text">
            <Card className="h-100 shadow border-0">
              <Card.Body>
                <Card.Title className="fw-bold">{option.name}</Card.Title>
                <Card.Text>{option.description}</Card.Text>
                <p><strong>Pros:</strong> {option.advantages}</p>
                <p><strong>Cons:</strong> {option.limitations}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TravelOptions;