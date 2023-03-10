// react imports
import { useState, useEffect } from "react";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import { SingleComment } from "./SingleComment";
import { CommentsForm } from "./CommentsForm";

// other imports
import { FormattedMessage } from "react-intl";

interface CommentsProps {
  comments: Comment[];
}

interface Comment {
  nickname?: string;
  email: string;
  timestamp: number;
  message: string;
}

export const CommentsContainer = ({ comments }: CommentsProps) => {
  const [commentsArray, setCommentsArray] = useState<Comment[]>(comments);

  const handleNewComment = (newComment: Comment) => {
    const newCommentsArray: Comment[] = [newComment, ...commentsArray];
    setCommentsArray(newCommentsArray);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h3>
                <FormattedMessage
                  id="comments_headline"
                  defaultMessage="Comments"
                />
                :
              </h3>
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
                <FormattedMessage
                  id="comments_no_comments"
                  defaultMessage="This episode does not have any comments. Be first to add one."
                />
              </p>
            </Row>
          )}

          <Row className="my-4">
            <Col>
              <h4>
                <FormattedMessage
                  id="comments_add_comment_headline"
                  defaultMessage="Add comment"
                />
                :
              </h4>
            </Col>
          </Row>
          <CommentsForm handleNewComment={handleNewComment} />
        </Col>
      </Row>
    </Container>
  );
};
