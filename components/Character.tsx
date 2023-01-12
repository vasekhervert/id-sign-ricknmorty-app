import { useState } from "react";
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
  const [shouldShowMoreInfo, setShouldShowMoreInfo] = useState<boolean>(false);
  const { id, name, species, image, origin } = props;
  return (
    <Card
      className="mb-4"
      style={{ cursor: "pointer", minHeight: 190 }}
      onClick={() => {
        setShouldShowMoreInfo(!shouldShowMoreInfo);
      }}
    >
      <Card.Body>
        <Image
          alt={`${name}'s Avatar`}
          src={image}
          width={100}
          height={100}
          className={`m-auto d-block ${shouldShowMoreInfo && "rounded"}`}
        />
        <Card.Title className="text-center mt-2 fs-6">{name}</Card.Title>
        {shouldShowMoreInfo && (
          <Card.Text>
            <p>
              Species: {species}
              <br />
              Origin: {origin.name}
            </p>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Character;
