// next imports
import Link from "next/link";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LangSwitcher from "./LangSwitcher";

interface HeaderProps {
  props: {
    locale: string;
    onLanguageChange(value: string): void;
  };
} // same as langswitch

const Header = ({ props }: HeaderProps) => {
  const { locale, onLanguageChange } = props;
  return (
    <header>
      <Container>
        <Row className="justify-content-between py-4">
          <Col>
            <Link href="/" className="text-black text-decoration-none">
              <h1 className="fs-4">Rick and Morty Next.js App</h1>
            </Link>
          </Col>
          <Col className="text-end">
            <LangSwitcher locale={locale} onLanguageChange={onLanguageChange} />
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default Header;
