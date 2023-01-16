// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import SingleComment from "./SingleComment";
import CommentsForm from "./CommentsForm";

interface CommentsProps {
  comments: {
    name?: string;
    email: string;
    timestamp: number;
    message: string;
  }[];
}

function CommentsContainer(comments: CommentsProps) {
  const commentsArray = comments.comments;
  console.log(commentsArray);

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
              <Row key={i.timestamp}>
                <SingleComment
                  author={i.name || i.email}
                  message={i.message}
                  timestamp={i.timestamp}
                />
              </Row>
            ))
          ) : (
            <p>This episode does not have any comments. Be first to add one.</p>
          )}

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

export default CommentsContainer;
