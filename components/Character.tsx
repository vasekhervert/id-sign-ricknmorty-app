import Image from "next/image";

interface Char {
  props: {
    id: string;
    name: string;
    species: string;
    image: string;
    origin: {
      name: string;
    };
  };
}

const Character = ({ props }: Char) => {
  const { id, name, species, image, origin } = props;
  return (
    <div>
      <Image alt={`${name}'s Avatar`} src={image} width={100} height={100} />
      {name}
    </div>
  );
};

export default Character;
