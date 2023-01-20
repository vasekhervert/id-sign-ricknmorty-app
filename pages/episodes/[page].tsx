// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../../components/Layout/Layout";
import Hero from "../../components/Layout/Hero";
import EpisodesList from "../../components/EpisodesList";
import CustomPagination from "../../components/CustomPagination";

// other imports
import { getAllEpisodes, getEpisodesInfo } from "../../helpers";
import { FormattedMessage } from "react-intl";

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

const Page: NextPage<Props> = (props) => {
  const { episodes } = props;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await getEpisodesInfo();
  const pagesArr = Array.from({ length: pages - 1 }, (_, i) =>
    (i + 2).toString()
  ); // create array of page ids starting with 2 (1 is homepage) with length of number of pages - 1 (homepage)

  const paths = pagesArr.map((i: string) => ({
    params: { page: i },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const episodes = await getAllEpisodes(Number(params.page));

  return {
    props: { ...episodes },
  };
};

export default Page;
