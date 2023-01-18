// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Layout from "../../components/Layout/Layout";
import Character from "../../components/Character";
import CommentsContainer from "../../components/Comments/CommentsContainer";

// other imports
import { getAllEpisodesIds, getSingleEpisode } from "../../helpers";
import Hero from "../../components/Layout/Hero";
import * as fs from "fs";

interface Props {
  episode: {
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
  };
  comments: {
    name?: string;
    email: string;
    timestamp: number;
    message: string;
  }[];
}

const Episode: NextPage<Props> = (props) => {
  const { name, episode, characters, air_date } = props.episode;

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

      <CommentsContainer comments={props.comments} />
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const data = await getSingleEpisode(params.id);

  const filePath = `json/episode-${params.id}.json`;
  let fileContents: string;

  if (fs.existsSync(filePath)) {
    fileContents = fs.readFileSync(filePath, "utf8");
  } else {
    fileContents = `{}`;
  }

  const comments = Object.values(JSON.parse(fileContents));

  return {
    props: { episode: data.episode, comments: comments },
    revalidate: 86400, // 86400 s = 1 d
  };
};

export default Episode;
