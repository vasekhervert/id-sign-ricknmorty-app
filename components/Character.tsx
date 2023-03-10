import { useState } from "react";

import Image from "next/image";
import { FormattedMessage } from "react-intl";

type CharacterProps = {
  id: string;
  name: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
};

export const Character = ({
  name,
  species,
  image,
  origin,
  gender,
}: CharacterProps) => {
  const [shouldShowMoreInfo, setShouldShowMoreInfo] = useState<boolean>(false);

  return (
    <div
      className="rounded my-2 border"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setShouldShowMoreInfo(!shouldShowMoreInfo);
      }}
    >
      <div className="d-flex align-items-center">
        <div>
          <Image
            alt={`${name}'s Avatar`}
            src={image}
            width={64}
            height={64}
            className={`radius-top-left ${
              !shouldShowMoreInfo && "radius-bottom-left"
            }`}
          />
        </div>
        <div className="fs-6 fw-bold px-4">{name}</div>
      </div>
      <div className={`p-4 ${shouldShowMoreInfo ? "d-block" : "d-none"}`}>
        <div>
          <span>
            <FormattedMessage
              id="characters_species"
              defaultMessage="Species"
            />
            : {species}
            <br />
            <FormattedMessage
              id="characters_origin"
              defaultMessage="Origin"
            />: {origin.name}
            <br />
            <FormattedMessage
              id="characters_gender"
              defaultMessage="Gender"
            />: {gender}
          </span>
        </div>
      </div>
    </div>
  );
};
