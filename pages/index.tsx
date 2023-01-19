// next imports
import { NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../components/Layout/Layout";
import Hero from "../components/Layout/Hero";
import EpisodesList from "../components/EpisodesList";
import CustomPagination from "../components/CustomPagination";

// other imports
import { getAllEpisodes } from "../helpers";

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
  const { info, results } = episodes;
  const currentPage = info.next != null ? info.next - 1 : info.prev! + 1;

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

              <EpisodesList episodes={results} />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
              <CustomPagination currentPage={currentPage} pages={info.pages} />
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const episodes = await getAllEpisodes(1);

  return {
    props: { ...episodes },
  };
}

export default Home;
