// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../../components/Layout/Layout";

// other imports
import { getAllEpisodesIds, getSingleEpisode } from "../../helpers";
import Character from "../../components/Character";

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
      <Container>
        <Row>
          <Col>
            <p>{episode}</p>
            <h1>{name}</h1>
            <p>Air date: {air_date}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Characters in this episode:</h3>
          </Col>
        </Row>
        <div>
          <div>
            {characters.map((i) => (
              <div key={i.id}>
                <Character props={i} />
              </div>
            ))}
          </div>
        </div>
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
