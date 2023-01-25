// next imports
import { GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import { Layout } from "../components/Layout/Layout";
import { Hero } from "../components/Layout/Hero";
import { EpisodesList } from "../components/EpisodesList";
import { CustomPagination } from "../components/CustomPagination";

// other imports
import { getAllEpisodes } from "../helpers";
import { FormattedMessage } from "react-intl";

type HomeProps = {
  episodes: {
    info: Info;
    results: Results[];
  };
};

type Info = {
  count: number;
  pages: number;
  prev: number | null;
  next: number | null;
};

type Results = {
  name: string;
  id: string;
  episode: string;
};

const Home: NextPage<HomeProps> = ({ episodes }) => {
  const { info, results } = episodes;

  const currentPage = info.next != null ? info.next - 1 : info.prev! + 1;

  return (
    <Layout>
      <Hero>
        <h2 className="text-center">
          <FormattedMessage
            id="hero_text"
            defaultMessage="Welcome to Rick and Morty App!"
          />
        </h2>
      </Hero>

      <main>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
              <h3 className="mt-4">
                <FormattedMessage
                  id="episodes_headline"
                  defaultMessage="Episodes"
                />
                :
              </h3>

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

export const getStaticProps: GetStaticProps = async () => {
  const episodes = await getAllEpisodes(1);

  return {
    props: { ...episodes },
  };
};

export default Home;
