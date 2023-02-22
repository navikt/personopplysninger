import React from "react";
import { Publikumsmottak, Aapningstid } from "types/enhetKontaktInfo";
import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import Apningstid from "./Apningstid";

interface Props {
  publikumsmottak: Publikumsmottak[];
  valgtMottakId: number;
}

interface Aapningstider {
  apningstider: Aapningstid[];
  andreApningstider: boolean;
}

const FormaterApningstider = (props: Aapningstider) => {
  const { apningstider, andreApningstider } = props;
  const headingID = `${andreApningstider ? "dittnavkontor.andreapningstider" : "dittnavkontor.apningstider" }`;

  return (
      <table className="apningstider__table">
        <Heading
            as="caption"
            size={"xsmall"}
            level={"3"}
            className={"apningstider__caption"}
        >
          <FormattedMessage
              id={headingID}
          />
        </Heading>
        <thead className={"sr-only"}>
          <tr>
              <th scope={"col"}>Ukedag</th>
              <th scope={"col"}>Tidsrom</th>
              <th scope={"col"}>Kommentar</th>
          </tr>
        </thead>
        <tbody>
          {apningstider.map((apningstid) => (
              <Apningstid key={`${headingID} + ${apningstid.dag}`} apningstid={apningstid} />
          ))}
        </tbody>
      </table>
  );
};

const Apningstider = (props: Props) => {
    const { publikumsmottak, valgtMottakId } = props;
    const mottak = publikumsmottak[valgtMottakId];
    let aapningstider: Aapningstid[] = [];
    if (mottak.aapningMandag) { aapningstider.push(mottak.aapningMandag); }
    if (mottak.aapningTirsdag) { aapningstider.push(mottak.aapningTirsdag); }
    if (mottak.aapningOnsdag) { aapningstider.push(mottak.aapningOnsdag); }
    if (mottak.aapningTorsdag) { aapningstider.push(mottak.aapningTorsdag); }
    if (mottak.aapningFredag) { aapningstider.push(mottak.aapningFredag); }

    return (
        <div className="apningstider">
            <FormaterApningstider
                andreApningstider={false}
                apningstider={aapningstider}
            />
            {mottak.aapningAndre &&
                <FormaterApningstider
                    andreApningstider={true}
                    apningstider={mottak.aapningAndre}
                />
            }
        </div>
    );
};

export default Apningstider;
