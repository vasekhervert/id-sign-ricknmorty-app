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
import {
  getAllEpisodesIds,
  getSingleEpisode,
  makeDateAndTime,
} from "../../helpers";
import Hero from "../../components/Layout/Hero";
import * as fs from "fs";
import { FormattedMessage } from "react-intl";

interface Props {
  episode: {
    air_date: string;
    characters: {
      id: string;
      name: string;
      species: string;
      image: string;
      gender: string;
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
  epis: {};
}

const Episode: NextPage<Props> = (props) => {
  const { name, episode, characters, air_date } = props.episode;
  const date = Date.parse(air_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // console.log(new Date(date).toLocaleDateString("cs-CZ", options));

  return (
    <Layout>
      <Hero>
        <h2>{name}</h2>
        <p>
          <span className="fw-bold">{episode}</span> |{" "}
          <FormattedMessage
            id="air_date"
            defaultMessage={`Air date: {ts, date, ::yyyyMMdd}`}
            values={{
              ts: new Date(air_date),
            }}
          />
        </p>
      </Hero>

      <Container className="mt-4">
        <Row>
          <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            <h3>
              <FormattedMessage
                id="characters"
                defaultMessage="Characters in this episode"
              />
              :
            </h3>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            <Row>
              {characters.map((i) => (
                <Col key={i.id} xs={6} md={2} lg={3}>
                  <Character props={i} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <CommentsContainer comments={props.comments} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllEpisodesIds();

  const paths = ids.map((i: string) => ({
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
    props: {
      episode: data.episode,
      comments: comments,
    },
    revalidate: 86400, // 86400 s = 1 d
  };
};

export default Episode;
