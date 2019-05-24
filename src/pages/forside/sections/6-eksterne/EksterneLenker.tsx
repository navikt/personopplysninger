import React from "react";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "../../../../components/linkbox/LinkBox";

const LinksContainer = () => (
  <div className="seksjon box-bottom-margin">
    {eksterneLenker.map(link => (
      <LinkBox
        id={link.id}
        key={link.id}
        icon={link.icon}
        tittel={link.tittel}
        beskrivelse={link.beskrivelse}
        lenkeTekst={link.lenkeTekst}
        url={link.url}
      />
    ))}
  </div>
);

export default LinksContainer;
