// next imports
import Link from "next/link";

interface EpisodesProps {
  episodes: {
    name?: string;
    id: string;
    episode: string;
  }[];
}

function EpisodesList(episodes: EpisodesProps) {
  return (
    <>
      {episodes.episodes.map((i) => (
        <Link
          href={`/episode/${i.id}`}
          key={i.id}
          className="text-decoration-none text-black"
        >
          <div className="border rounded p-4 my-2">
            {i.episode} - <span className="">{i.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default EpisodesList;
