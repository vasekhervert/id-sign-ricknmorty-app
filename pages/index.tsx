// next imports
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
import Hero from "../components/Layout/Hero";

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
      <Hero>
        <h2 className="text-center">Welcome to Rick and Morty App!</h2>
      </Hero>
      <main>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
              <h3 className="mt-4">Episodes: </h3>

              {episodes.results.map((i) => (
                <Link
                  href={`/episody/${i.id}`}
                  key={i.id}
                  className="text-decoration-none text-black"
                >
                  <div className="border rounded p-4 my-2">
                    {i.episode} - <span className="">{i.name}</span>
                  </div>
                </Link>
              ))}
            </Col>
          </Row>
        </Container>
      </main>
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
