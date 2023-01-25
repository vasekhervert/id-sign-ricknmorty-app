// next imports
import Link from "next/link";

type EpisodesProps = {
  episodes: Episode[];
};

type Episode = {
  name?: string;
  id: string;
  episode: string;
};

export const EpisodesList = ({ episodes }: EpisodesProps) => {
  return (
    <>
      {episodes.map((i) => (
        <Link
          href={`/episode/${i.id}`}
          key={i.id}
          className="text-decoration-none text-black"
        >
          <div className="border-top rounded p-2">
            {i.episode} - <span className="">{i.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
};
