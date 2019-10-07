import React from "react";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "./linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import DSOPIkon from "../../../../assets/img/DSOP.svg";
import { FormattedMessage } from "react-intl";
import { useStore } from "../../../../providers/Provider";

const LinksContainer = () => {
  const [{ featureToggles }] = useStore();
  return (
    <PanelBase className="el__panel">
      <div className="el__content">
        <div className="el__overskrift">
          <Systemtittel>
            <FormattedMessage id="eksternelenker.tittel" />
          </Systemtittel>
        </div>
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
        {featureToggles.data["personopplysninger.dsop"] && (
          <LinkBox
            id={"dsop"}
            icon={DSOPIkon}
            tittel={"eksternelenker.dsop.tittel"}
            beskrivelse={"eksternelenker.dsop.beskrivelse"}
            lenkeTekst={"eksternelenker.dsop.lenkeTekst"}
            to={"/person/personopplysninger/dsop"}
            component={"Link"}
          />
        )}
      </div>
    </PanelBase>
  );
};

export default LinksContainer;
