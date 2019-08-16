import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import ListElement from "../../../../../../components/listelement/ListElement";
import Melding from "../../../../../../components/melding/Melding";
import { Tlfnr } from "../../../../../../types/personalia";
import Kilde from "../../../../../../components/kilde/Kilde";
import Environment from "../../../../../../utils/Environments";
import endreIkon from "../../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import { useStore } from "../../../../../../providers/Provider";
import { basePath } from "../../../../../../App";

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const Telefonnummer = (props: Props) => {
  const [{ featureToggles }] = useStore();
  const { tlfnr } = props;
  return (
    <>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr && (tlfnr.jobb || tlfnr.mobil || tlfnr.privat) ? (
        <>
          <ul className="list-column-2">
            <ListElement titleId="personalia.tlfnr.jobb" content={tlfnr.jobb} />
            <ListElement
              titleId="personalia.tlfnr.mobil"
              content={tlfnr.mobil}
            />
            <ListElement
              titleId="personalia.tlfnr.privat"
              content={tlfnr.privat}
            />
          </ul>
          {featureToggles.data["personopplysninger.pdl"] ? (
            <Kilde
              kilde="personalia.source.nav"
              lenke={`${basePath}/telefonnummer/`}
              lenkeTekst="side.endre"
              ikon={endreIkon}
            />
          ) : (
            <Kilde
              kilde="personalia.source.nav"
              lenke={`${tjenesteUrl}/brukerprofil/`}
              lenkeTekst="personalia.link.brukerprofil.endre"
              eksternLenke={true}
              ikon={endreIkon}
            />
          )}
        </>
      ) : (
        <>
          <Melding meldingId="personalia.tlfnr.ingenData" />
          {featureToggles.data["personopplysninger.pdl"] ? (
            <Kilde
              kilde="personalia.source.nav"
              lenke={`${basePath}/telefonnummer/`}
              lenkeTekst="side.leggtil"
              ikon={leggTilIkon}
            />
          ) : (
            <Kilde
              kilde="personalia.source.nav"
              lenke={`${tjenesteUrl}/brukerprofil/`}
              lenkeTekst="personalia.link.brukerprofil.leggtil"
              eksternLenke={true}
              ikon={leggTilIkon}
            />
          )}
        </>
      )}
    </>
  );
};

export default Telefonnummer;
