import React from "react";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "../../../../components/linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";

const LinksContainer = () => (
  <PanelBase border={true} className="el__panel">
    <div className="el__content">
      <Systemtittel>Flere opplysninger på Ditt NAV</Systemtittel>
      <div className="el__info">
        <Normaltekst>
          Vi har også opplysninger om deg som ikke vises på denne siden. De
          opplysningene kan du finne ved å gå til de ulike tjenestene under.
        </Normaltekst>
      </div>
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
  </PanelBase>
);

export default LinksContainer;
