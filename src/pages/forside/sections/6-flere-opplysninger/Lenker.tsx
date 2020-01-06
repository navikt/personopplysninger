import React from "react";
import lenker from "./LenkerData";
import LinkBox from "./linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import DSOPIkon from "assets/img/DSOP.svg";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import SkattIkon from "assets/img/Skattekort.svg";
import MEDLIkon from "assets/img/MEDL.svg";
import FullmaktIkon from "assets/img/Fullmakt.svg";
import { FormattedMessage } from "react-intl";
import { useStore } from "store/Context";

const { REACT_APP_PDL_URL } = process.env;

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
        {lenker.map(link => (
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
            id={"skatt"}
            icon={SkattIkon}
            tittel={"lenker.skattetrekksmelding.tittel"}
            beskrivelse={"lenker.skattetrekksmelding.beskrivelse"}
            lenkeTekst={"lenker.skattetrekksmelding.lenkeTekst"}
            to={"/person/personopplysninger/skattetrekksmelding"}
            component={"Link"}
          />
        )}
        {featureToggles.data["personopplysninger.medl"] && (
          <LinkBox
            id={"medl"}
            icon={MEDLIkon}
            tittel={"lenker.medl.tittel"}
            beskrivelse={"lenker.medl.beskrivelse"}
            lenkeTekst={"lenker.medl.lenkeTekst"}
            to={"/person/personopplysninger/medlemskap-i-folketrygden"}
            component={"Link"}
          />
        )}
        {featureToggles.data["personopplysninger.fullmakt"] &&
          featureToggles.data["pdl-fullmakt"] && (
            <LinkBox
              id={"fullmakt"}
              icon={FullmaktIkon}
              tittel={"lenker.fullmakt.tittel"}
              beskrivelse={"lenker.fullmakt.beskrivelse"}
              lenkeTekst={"lenker.fullmakt.lenkeTekst"}
              to={`${REACT_APP_PDL_URL}`}
              component={"a"}
            />
          )}
      </div>
    </PanelBase>
  );
};

export default LinksContainer;
