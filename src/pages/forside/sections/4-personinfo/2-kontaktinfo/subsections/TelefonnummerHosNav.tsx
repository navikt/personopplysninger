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

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const TelefonnummerHosNav = (props: Props) => {
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
            <ListElement
              titleId="personalia.tlfnr.arbeid"
              content={tlfnr.jobb}
            />
            <ListElement
              titleId="personalia.tlfnr.mobil"
              content={tlfnr.mobil}
            />
            <ListElement
              titleId="personalia.tlfnr.hjem"
              content={tlfnr.privat}
            />
          </ul>
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.endre"
            lenkeType={"EKSTERN"}
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
            lenkeType={"EKSTERN"}
            ikon={leggTilIkon}
          />
        </>
      )}
    </>
  );
};

export default TelefonnummerHosNav;
