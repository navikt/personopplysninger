import React from "react";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "../../components/linkbox/LinkBox";

const LinksContainer = () => (
  <React.Fragment>
    {eksterneLenker.map(
      (link: any) =>
        link.visible && (
          <LinkBox
            id={link.id}
            key={link.id}
            icon={link.icon}
            tittel={link.tittel}
            beskrivelse={link.beskrivelse}
            lenkeTekst={link.lenkeTekst}
            url={link.url}
          />
        )
    )}
  </React.Fragment>
);

export default LinksContainer;
