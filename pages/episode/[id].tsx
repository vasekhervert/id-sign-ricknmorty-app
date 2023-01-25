// next imports
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// bootstrap imports
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import { Layout } from "../../components/Layout/Layout";
import { Character } from "../../components/Character";
import { CommentsContainer } from "../../components/Comments/CommentsContainer";

// other imports
import { getAllEpisodesIds, getSingleEpisode } from "../../helpers";
import { Hero } from "../../components/Layout/Hero";
import * as fs from "fs";
import { FormattedMessage, FormattedDate } from "react-intl";

type EpisodeProps = {
  episode: Episode;
  comments: Comment[];
};

type Episode = {
  air_date: string;
  characters: Character[];
  episode: string;
  name: string;
};

type Comment = {
  name?: string;
  email: string;
  timestamp: number;
  message: string;
};

type Character = {
  id: string;
  name: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
};

export const Episode: NextPage<EpisodeProps> = ({ episode, comments }) => {
  const { name, characters, air_date } = episode;

  return (
    <Layout>
      <Hero>
        <h2>{name}</h2>
        <p>
          <span className="fw-bold">{episode.episode}</span> |{" "}
          <FormattedMessage id="air_date" defaultMessage="Air date" />:{" "}
          <FormattedDate
            value={new Date(air_date)}
            day="numeric"
            month="long"
            year="numeric"
          />
        </p>
      </Hero>

      <Container className="mt-4">
        <Row>
          <Col>
            <h3 className="mb-4">
              <FormattedMessage
                id="characters"
                defaultMessage="Characters in this episode"
              />
              :
            </h3>
          </Col>
        </Row>

        <Row>
          {characters.map((i) => (
            <Col key={i.id} xs={6} md={3} lg={4}>
              <Character
                id={i.id}
                name={i.name}
                species={i.species}
                image={i.image}
                gender={i.gender}
                origin={i.origin}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <CommentsContainer comments={comments} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEpisodesIds();

  let paths = [];

  for (let i = 0; i < ids.length; i++) {
    const currentItem = [
      { params: { id: ids[i] }, locale: "en-US" },
      { params: { id: ids[i] }, locale: "cs-CZ" },
    ];

    paths.push(...currentItem);
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const data = await getSingleEpisode(params.id);

  // check if comments folder exists
  if (!fs.existsSync("comments")) {
    // if not, create it
    fs.mkdirSync("comments");
  }

  const filePath = `comments/episode-${params.id}.json`;
  let fileContents: string;

  if (fs.existsSync(filePath)) {
    fileContents = fs.readFileSync(filePath, "utf8");
  } else {
    fileContents = `{}`;
  }

  const comments = Object.values(JSON.parse(fileContents));

  return {
    props: {
      episode: data.episode,
      comments: comments,
    },
    revalidate: 86400, // 86400 s = 1 d
  };
};

export default Episode;
