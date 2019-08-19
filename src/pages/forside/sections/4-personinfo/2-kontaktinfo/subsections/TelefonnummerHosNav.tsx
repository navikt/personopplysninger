import React, { useState } from "react";
import { Element, Undertittel } from "nav-frontend-typografi";
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
import { Input } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const Telefonnummer = (props: Props) => {
  const [{ featureToggles }] = useStore();
  const [edit, settEdit] = useState(false);
  const { tlfnr } = props;

  const formConfig = {
    jobb: {},
    mobil: {},
    privat: {}
  };

  const initialValues = tlfnr && {
    jobb: tlfnr.jobb,
    mobil: tlfnr.mobil,
    privat: tlfnr.privat
  };

  const send = (e: FormContext) => {
    const { isValid } = e;

    if (isValid) {
      console.log("valid! yay");
    }
  };

  return (
    <FormValidation
      onSubmit={send}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        console.log(errors);
        console.log(fields);
        console.log(submitted);
        return (
          <>
            <div className="underseksjon__header">
              <Undertittel>
                <FormattedMessage id="personalia.tlfnr.oveskrift" />
              </Undertittel>
            </div>
            {edit ? (
              <>
                <ul className="list-column-2">
                  <li>
                    <Element>
                      <FormattedMessage id={"personalia.tlfnr.jobb"} />
                      <FormattedMessage id={"side.valgfritt"} />
                    </Element>
                    <Input
                      label={""}
                      value={fields.jobb}
                      onChange={v => setField({ jobb: v.target.value })}
                    />
                  </li>
                  <li>
                    <Element>
                      <FormattedMessage id={"personalia.tlfnr.mobil"} />
                      <FormattedMessage id={"side.valgfritt"} />
                    </Element>
                    <Input
                      label={""}
                      value={fields.mobil}
                      onChange={v => setField({ mobil: v.target.value })}
                    />
                  </li>
                  <li>
                    <Element>
                      <FormattedMessage id={"personalia.tlfnr.privat"} />
                      <FormattedMessage id={"side.valgfritt"} />
                    </Element>
                    <Input
                      label={""}
                      value={fields.privat}
                      onChange={v => setField({ privat: v.target.value })}
                    />
                  </li>
                  <li />
                </ul>
                <div className="knapp__lagre">
                  <Hovedknapp>
                    <FormattedMessage id="side.lagre" />
                  </Hovedknapp>
                </div>
                <Kilde
                  kilde="personalia.source.nav"
                  onClick={() => settEdit(false)}
                  lenkeTekst="side.avbryt"
                  lenkeType={"KNAPP"}
                />
              </>
            ) : tlfnr && (tlfnr.jobb || tlfnr.mobil || tlfnr.privat) ? (
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
        );
      }}
    </FormValidation>
  );
};

export default Telefonnummer;
