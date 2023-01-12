// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../../components/Layout/Layout";
import Character from "../../components/Character";
import Comments from "../../components/Comments/CommentsContainer";

// other imports
import { getAllEpisodesIds, getSingleEpisode } from "../../helpers";
import Hero from "../../components/Layout/Hero";

interface Props {
  air_date: string;
  characters: {
    id: string;
    name: string;
    species: string;
    image: string;
    origin: { name: string };
  }[];
  episode: string;
  name: string;
}

const Episode: NextPage<Props> = (props) => {
  const { name, episode, characters, air_date } = props;

  return (
    <Layout>
      <Hero>
        <h2>{name}</h2>
        <p>
          <span className="fw-bold">{episode}</span> | Air date: {air_date}
        </p>
      </Hero>

      <Container className="mt-4">
        <Row>
          <Col>
            <h3>Characters in this episode:</h3>
          </Col>
        </Row>

        <Row>
          {characters.map((i) => (
            <Col key={i.id} xs={6} md={2}>
              <Character props={i} />
            </Col>
          ))}
        </Row>
      </Container>

      <Comments />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEpisodesIds();

  const paths = ids.map((i: object) => ({
    params: { id: i },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const data = await getSingleEpisode(params.id);

  return {
    props: data.episode,
  };
};

export default Episode;
