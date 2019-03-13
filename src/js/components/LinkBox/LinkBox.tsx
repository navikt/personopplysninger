import React, { useState, useEffect } from "react";
import Mobile from "./responsive/Mobile";
import Desktop from "./responsive/Desktop";

interface Props {
  id: string;
  header: string;
  information: string;
  linkText: string;
  url: string;
  icon?: string;
  infoBoxContent: {
    __html: string;
  };
}

const LinkBox = (props: Props) => {
  const [erMobil, setErMobil] = useState(window.innerWidth <= 420);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setErMobil(window.innerWidth <= 420)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setErMobil(window.innerWidth <= 420)
      );
    };
  });

  return erMobil ? <Mobile {...props} /> : <Desktop {...props} />;
};

export default LinkBox;
