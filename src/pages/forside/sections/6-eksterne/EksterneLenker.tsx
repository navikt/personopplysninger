import React from "react";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "../../../../components/linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import dineSaker from "../../../../assets/img/DineSaker.svg";
import { FormattedMessage } from "react-intl";

const LinksContainer = () => (
  <PanelBase border={true} className="el__panel">
    <div className="el__content">
      <Systemtittel>
        <FormattedMessage id="eksternelenker.tittel" />
      </Systemtittel>
      <div className="el__info">
        <Normaltekst>
          <FormattedMessage id="eksternelenker.beskrivelse" />
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
          to={link.url}
          component={"a"}
        />
      ))}
      <LinkBox
        id={"dsop"}
        icon={dineSaker}
        tittel={"eksternelenker.dsop.tittel"}
        beskrivelse={"eksternelenker.dsop.beskrivelse"}
        lenkeTekst={"eksternelenker.dsop.lenkeTekst"}
        to={"/person/personopplysninger/dsop/historikk"}
        component={"Link"}
      />
    </div>
  </PanelBase>
);

export default LinksContainer;
