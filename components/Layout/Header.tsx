// next imports
import Link from "next/link";

// bootstrap imports
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header() {
  return (
    <header>
      <Container>
        <Row className="justify-content-between">
          <Col>
            <Link href="/">Rick and Morty Next.js App</Link>
          </Col>
          <Col className="text-end">cz | en</Col>
        </Row>
      </Container>
    </header>
  );
}
