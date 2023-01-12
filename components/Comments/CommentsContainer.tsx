// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import SingleComment from "./SingleComment";
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
                  <Container>
                    <Row>
                      <Col>
                        <label htmlFor="nickname">Nickname:</label>
                        <Field id="nickname" name="nickname" />
                      </Col>
                      <Col>
                        <label htmlFor="email">Email:</label>
                        <Field
                          id="email"
                          name="email"
                          placeholder="example@email.com"
                          type="email"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label>Comment:</label>
                        <Field as="textarea" id="message" name="message" />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label>
                          <Field type="checkbox" name="confirm" />I agree with
                          the publication of the completed data
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button type="submit">Submit</button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
