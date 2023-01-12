// next imports
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// other imports
import client from "../lib/apollo-client";
import { EPISODES_QUERY } from "../queries";
import Layout from "../components/Layout/Layout";

interface Props {
  episodes: {
    info: {
      count: number;
      pages: number;
      prev: number | null;
      next: number | null;
    };
    results: {
      name: string;
      id: string;
      episode: string;
    }[];
  };
}

const Home: NextPage<Props> = (props) => {
  const { episodes } = props;

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col
            className="bg-dark text-light"
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 className="text-center">Welcome to Rick and Morty App!</h2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <main>
            <ul>
              {episodes.results.map((i) => (
                <li key={i.id}>
                  <Link href={`/episody/${i.id}`}>
                    {i.episode} - {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: EPISODES_QUERY,
  });

  return {
    props: data,
  };
}

export default Home;
