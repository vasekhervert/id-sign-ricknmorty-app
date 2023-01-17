// next imports
import { Router, useRouter } from "next/router";

//react imports
import { useState } from "react";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// other imports
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { postComment } from "../../helpers";

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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

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
            setLoading(true);
            postComment(id, values).then((data) => {
              setLoading(false);
              console.log(data);
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Container className="mb-4">
                <Row>
                  <Col>
                    <label htmlFor="nickname">Nickname:</label>
                    <Field id="nickname" name="nickname" type="text" />
                  </Col>
                  <Col>
                    <label htmlFor="email">Email:</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="example@email.com"
                      type="email"
                    />
                    {errors.email && touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>Comment:</label>
                    <Field as="textarea" id="message" name="message" />
                    {errors.message && touched.message && (
                      <p className="text-danger">{errors.message}</p>
                    )}
                  </Col>
                </Row>
                <Row className="mb-4">
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
                        <p className="text-danger">
                          {errors.publicationConsent}
                        </p>
                      )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
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
