// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// other imports
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface FormValues {
  nickname: string;
  email: string;
  message: string;
  publicationConsent: boolean;
}

const CommentSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  message: Yup.string()
    .min(2, "Your message is too short.")
    .required("This field is required."),
  publicationConsent: Yup.bool()
    .oneOf([true], "You have to consent to publication of the completed data.")
    .required("You have to consent to publication of the completed data."),
});

export default function CommentsForm() {
  return (
    <Row>
      <Col>
        <Formik
          initialValues={{
            nickname: "",
            email: "",
            message: "",
            publicationConsent: false,
          }}
          validationSchema={CommentSchema}
          onSubmit={(values: FormValues) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
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
                    {errors.email && touched.email && <p>{errors.email}</p>}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Comment:</label>
                    <Field as="textarea" id="message" name="message" />
                    {errors.message && touched.message && (
                      <p>{errors.message}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label htmlFor="publicationConsent">
                      <Field
                        type="checkbox"
                        id="publicationConsent"
                        name="publicationConsent"
                      />
                      I agree with the publication of the completed data
                    </label>
                    {errors.publicationConsent &&
                      touched.publicationConsent && (
                        <p>{errors.publicationConsent}</p>
                      )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button type="submit">Submit</button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}
