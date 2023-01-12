import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

const Episodes: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div></div>
    </>
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

export default Episodes;
