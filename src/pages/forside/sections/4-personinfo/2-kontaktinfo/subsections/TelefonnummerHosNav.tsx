import React, { useState } from "react";
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
import { FormValidation, FormContext } from "calidation";

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const Telefonnummer = (props: Props) => {
  const [{ featureToggles }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();
  const [edit, settEdit] = useState(false);
  const { tlfnr } = props;

  const formConfig = {
    jobb: {
      isRequired: "Username is required!"
    },
    mobil: {
      isRequired: "Username is required!"
    },
    privat: {
      isRequired: "Username is required!"
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;

    if (isValid) {
      console.log("valid! yay");
      settLoading(true);
      settLoading(false);
    }
  };

  return (
    <FormValidation onSubmit={send} config={formConfig}>
      {({ errors, fields, submitted }) => (
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
                  titleId="personalia.tlfnr.jobb"
                  content={tlfnr.jobb}
                />
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
                  onClick={() => settEdit(true)}
                  lenkeTekst="side.endre"
                  lenkeType={"KNAPP"}
                  ikon={endreIkon}
                />
              ) : (
                <Kilde
                  kilde="personalia.source.nav"
                  lenke={`${tjenesteUrl}/brukerprofil/`}
                  lenkeTekst="personalia.link.brukerprofil.endre"
                  lenkeType={"EKSTERN"}
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
                  onClick={() => settEdit(true)}
                  lenkeTekst="side.leggtil"
                  lenkeType={"KNAPP"}
                  ikon={leggTilIkon}
                />
              ) : (
                <Kilde
                  kilde="personalia.source.nav"
                  lenke={`${tjenesteUrl}/brukerprofil/`}
                  lenkeTekst="personalia.link.brukerprofil.leggtil"
                  lenkeType={"EKSTERN"}
                  ikon={leggTilIkon}
                />
              )}
            </>
          )}
        </>
      )}
    </FormValidation>
  );
};

export default Telefonnummer;
