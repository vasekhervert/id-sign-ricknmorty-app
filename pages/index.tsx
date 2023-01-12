import Head from "next/head";
import { NextPage } from "next";
import client from "../lib/apollo-client";
import { EPISODES_QUERY } from "../queries";

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

const Home: NextPage<Props> = (props) => {
  const { episodes } = props;

  return (
    <>
      <Head>
        <title>Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {episodes.results.map((i) => (
            <li key={i.id}>
              {i.episode} - {i.name}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: EPISODES_QUERY,
  });

  return {
    props: data,
  };
}

export default Home;
