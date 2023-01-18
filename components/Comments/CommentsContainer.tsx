// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import SingleComment from "./SingleComment";
import CommentsForm from "./CommentsForm";

interface CommentsProps {
  comments: {
    nickname?: string;
    email: string;
    timestamp: number;
    message: string;
  }[];
}

function CommentsContainer(comments: CommentsProps) {
  const commentsArray = comments.comments;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h3>Comments:</h3>
            </Col>
          </Row>
          {commentsArray.length > 0 ? (
            commentsArray.map((i) => (
              <Row key={i.timestamp} className="mb-2">
                <SingleComment
                  author={i.nickname || i.email}
                  message={i.message}
                  timestamp={i.timestamp}
                />
              </Row>
            ))
          ) : (
            <Row className="my-4">
              <p className="text-center">
                This episode does not have any comments. Be first to add one.
              </p>
            </Row>
          )}

          <Row className="my-4">
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

export default CommentsContainer;
