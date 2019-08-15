import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import ListElement from "../../../../../../components/listelement/ListElement";
import Melding from "../../../../../../components/melding/Melding";
import { Tlfnr } from "../../../../../../types/personalia";
import Kilde from "../../../../../../components/kilde/Kilde";
import Environment from "../../../../../../utils/Environments";
import endreIkon from "../../../../../../assets/img/Pencil.svg";

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const Telefonnummer = (props: Props) => {
  const { tlfnr } = props;
  return (
    <>
      <div className="underseksjon__overskrift">
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
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.endre"
            eksternLenke={true}
            ikon={endreIkon}
          />
        </>
      ) : (
        <>
          <Melding meldingId="personalia.tlfnr.ingenData" />
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.leggtil"
            eksternLenke={true}
            ikon={endreIkon}
          />
        </>
      )}
    </>
  );
};

export default Telefonnummer;
