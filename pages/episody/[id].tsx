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

  const res = await fetch(
    `${process.env.BASE_URL}/api/comments?id=${params.id}`
  );
  let commentsArray: unknown[];
  if (!res.ok) {
    commentsArray = [];
  } else {
    const comments = await res.json();
    commentsArray = Object.values(JSON.parse(comments));
  }

  return {
    props: { episode: data.episode, comments: commentsArray },
    revalidate: 86400,
  };
};

export default Episode;
