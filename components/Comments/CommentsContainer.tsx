// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Comment from "./Comment";
import { Formik, Field, Form } from "formik";

interface FormValues {
  nickname: string;
  email: string;
  message: string;
  confirm: boolean;
}

export default function Comments() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3>Comments:</h3>
        </Col>
      </Row>
      <Row>
        <Comment />
      </Row>
      <Row className="mt-2">
        <Col>
          <h4>Add comment:</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Formik
            initialValues={{
              nickname: "",
              email: "",
              message: "",
              confirm: false,
            }}
            onSubmit={(values: FormValues) => {
              console.log(values);
            }}
          >
            <Form>
              <label htmlFor="nickname">Nickname:</label>
              <Field id="nickname" name="nickname" />

              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                placeholder="example@email.com"
                type="email"
              />
              <label>Comment:</label>
              <Field as="textarea" id="message" name="message" />
              <label>
                <Field type="checkbox" name="confirm" />I agree with the
                publication of the completed data
              </label>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
