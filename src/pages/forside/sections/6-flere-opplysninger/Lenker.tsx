import React from "react";
import eksterneLenker from "./LenkerData";
import LinkBox from "./linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import DSOPIkon from "assets/img/DSOP.svg";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import { FormattedMessage } from "react-intl";
import { useStore } from "providers/Provider";

const LinksContainer = () => {
  const [{ featureToggles }] = useStore();
  return (
    <PanelBase className="el__panel">
      <div className="el__content">
        <div className="el__overskrift">
          <Systemtittel>
            <FormattedMessage id="lenker.tittel" />
          </Systemtittel>
        </div>
        <div className="el__info">
          <Normaltekst>
            <FormattedMessage id="lenker.beskrivelse" />
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
        {featureToggles.data["personopplysninger.inst"] && (
          <LinkBox
            id={"inst"}
            icon={INSTIkon}
            tittel={"lenker.inst.tittel"}
            beskrivelse={"lenker.inst.beskrivelse"}
            lenkeTekst={"lenker.inst.lenkeTekst"}
            to={"/person/personopplysninger/institusjonsopphold"}
            component={"Link"}
          />
        )}
        {featureToggles.data["personopplysninger.dsop"] && (
          <LinkBox
            id={"dsop"}
            icon={DSOPIkon}
            tittel={"lenker.dsop.tittel"}
            beskrivelse={"lenker.dsop.beskrivelse"}
            lenkeTekst={"lenker.dsop.lenkeTekst"}
            to={"/person/personopplysninger/dsop"}
            component={"Link"}
          />
        )}
        {featureToggles.data["personopplysninger.skatt"] && (
          <LinkBox
            id={"dsop"}
            icon={DSOPIkon}
            tittel={"lenker.skattetreksmelding.dsop.tittel"}
            beskrivelse={"lenker.skattetreksmelding.dsop.beskrivelse"}
            lenkeTekst={"lenker.skattetreksmelding.dsop.lenkeTekst"}
            to={"/person/personopplysninger/skattetreksmelding"}
            component={"Link"}
          />
        )}
      </div>
    </PanelBase>
  );
};

export default LinksContainer;
