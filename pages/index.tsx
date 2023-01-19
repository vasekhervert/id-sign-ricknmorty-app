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
import { getAllEpisodes } from "../helpers";

interface Props {
  episodes: {
    name: string;
    id: string;
    episode: string;
  }[];
}

const Home: NextPage<Props> = (props) => {
  const { episodes } = props;
  console.log(episodes);

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

              {episodes.map((i) => (
                <Link
                  href={`/episode/${i.id}`}
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
  const epis = await getAllEpisodes(1);
  const { data } = await client.query({
    query: EPISODES_QUERY,
  });

  return {
    props: { episodes: epis },
  };
}

export default Home;
