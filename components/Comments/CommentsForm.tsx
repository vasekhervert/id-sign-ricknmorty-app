// next imports
import { useRouter } from "next/router";

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
import { FormattedMessage, useIntl } from "react-intl";

interface FormValues {
  nickname: string;
  email: string;
  message: string;
  publicationConsent: boolean;
}

export default function CommentsForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [commentPosted, setCommentPosted] = useState<boolean>(false);
  const router = useRouter();
  const intl = useIntl();
  const { id } = router.query;

  // the schema has to be inside the component to be able to use useIntl huk
  const CommentSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: "comments_error_email_invalid" }))
      .required(intl.formatMessage({ id: "comments_error_required" })),
    message: Yup.string()
      .min(2, intl.formatMessage({ id: "comments_error_comment_too_short" }))
      .required(intl.formatMessage({ id: "comments_error_required" })),
    publicationConsent: Yup.bool()
      .oneOf(
        [true],
        intl.formatMessage({ id: "comments_error_consent_required" })
      )
      .required(intl.formatMessage({ id: "comments_error_consent_required" })),
  });

  return (
    <Row className="position-relative">
      <Col>
        <Formik
          initialValues={{
            nickname: "",
            email: "",
            message: "",
            publicationConsent: false,
          }}
          validationSchema={CommentSchema}
          onSubmit={(values: FormValues, actions) => {
            setLoading(true);
            postComment(id, router.asPath, values);
            setTimeout(() => {
              setLoading(false);
              setCommentPosted(true);
              actions.resetForm({
                values: {
                  nickname: "",
                  email: "",
                  message: "",
                  publicationConsent: false,
                },
              });
            }, 1500);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Container className="mb-4">
                <Row>
                  <Col>
                    <label htmlFor="nickname">
                      <FormattedMessage
                        id="comments_nickname"
                        defaultMessage="Nickname"
                      />
                      :
                    </label>
                    <Field id="nickname" name="nickname" type="text" />
                  </Col>
                  <Col>
                    <label htmlFor="email">Email:</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="abc@defgh.com"
                      type="email"
                    />
                    {errors.email && touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>
                      <FormattedMessage
                        id="comments_comment"
                        defaultMessage="Comment"
                      />
                      :
                    </label>
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
                      <FormattedMessage
                        id="comments_consent"
                        defaultMessage="I agree with the publication of the completed data"
                      />
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
                      <FormattedMessage
                        id="comments_submit_button"
                        defaultMessage="Submit"
                      />
                    </button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </Col>
      {loading && (
        <div className="position-absolute top-0 left-0 bottom-0 right-0 bg-white">
          <svg
            className="loading"
            version="1.1"
            id="L9"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
          >
            <path
              fill="#000"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )}
      {commentPosted && (
        <div className="position-absolute top-0 left-0 bottom-0 right-0 bg-white">
          <div className="position-relative text-center">
            <p className="text-success fw-bold fs-4">
              <FormattedMessage
                id="comments_success"
                defaultMessage="Success"
              />
              !
            </p>
            <p>
              <FormattedMessage
                id="comments_posted"
                defaultMessage="Your comment has been posted. Refresh the page to see it."
              />
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setCommentPosted(false)}
            >
              <FormattedMessage
                id="comments_button_add_more"
                defaultMessage="Add another comment"
              />
            </button>
          </div>
        </div>
      )}
    </Row>
  );
}
