import Card from "react-bootstrap/Card";

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
    <Card className="mb-4" style={{ cursor: "pointer" }}>
      <Card.Body>
        <Image
          alt={`${name}'s Avatar`}
          src={image}
          width={100}
          height={100}
          className="m-auto d-block"
        />
        <Card.Title className="text-center mt-2">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Character;
