// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface HeroProps {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

const Hero = ({ children }: HeroProps) => {
  return (
    <Container fluid className="bg-dark text-light">
      <Container
        className="d-flex align-items-center"
        style={{
          height: 200,
        }}
      >
        {" "}
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
