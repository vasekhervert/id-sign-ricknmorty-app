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
import Hero from "../../components/Layout/Hero";
import * as fs from "fs";

interface Props {
  //   episode: {
  //     air_date: string;
  //     characters: {
  //       id: string;
  //       name: string;
  //       species: string;
  //       image: string;
  //       origin: { name: string };
  //     }[];
  //     episode: string;
  //     name: string;
  //   };
  //   comments: {
  //     name?: string;
  //     email: string;
  //     timestamp: number;
  //     message: string;
  //   }[];
}

const Page: NextPage<Props> = (props) => {
  return (
    <Layout>
      <Hero>
        <h2>Welcome to Rick and Morty App!</h2>
      </Hero>

      <Container className="mt-4">
        <Row>
          <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            <h3>Episodes:</h3>
          </Col>
        </Row>
      </Container>
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
    props: { episode: data.episode, comments: comments },
  };
};

export default Page;
