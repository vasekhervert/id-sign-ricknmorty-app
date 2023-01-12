// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../../components/Layout/Layout";
import Character from "../../components/Character";

// other imports
import { getAllEpisodesIds, getSingleEpisode } from "../../helpers";

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
      <Container fluid className="bg-dark text-light">
        <Container
          className="d-flex align-items-center"
          style={{
            height: 200,
          }}
        >
          {" "}
          <Row>
            <Col>
              <h1>
                {name}
                <span className="fs-6"> {episode}</span>
              </h1>
              <p>Air date: {air_date}</p>
            </Col>
          </Row>
        </Container>
      </Container>
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
