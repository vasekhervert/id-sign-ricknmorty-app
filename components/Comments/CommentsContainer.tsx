// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import SingleComment from "./SingleComment";
import CommentsForm from "./CommentsForm";

export default function Comments() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h3>Comments:</h3>
            </Col>
          </Row>
          <Row>
            <SingleComment
              author="Mr. Meeseeks"
              email="vajco@slepici.cz"
              message="Im Mr. Meeseeks, look at me!"
              date="12.1.2023"
            />
          </Row>
          <Row className="mt-2">
            <Col>
              <h4>Add comment:</h4>
            </Col>
          </Row>
          <CommentsForm />
        </Col>
      </Row>
    </Container>
  );
}
