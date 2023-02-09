import React from "react";
import { Publikumsmottak } from "../../../../../../types/enhetKontaktInfo";
import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import Apningstid from "../apningstid/Apningstid";

interface Props {
  publikumsmottak: Publikumsmottak[];
  valgtMottakId: number;
}

const Apningstider = (props: Props) => {
  const { publikumsmottak, valgtMottakId } = props;

  return (
    <>
      <div className="apningstider">
        <table className="apningstider__table">
          <Heading
            as="caption"
            size={"xsmall"}
            level={"3"}
            className={"apningstider__caption"}
          >
            <FormattedMessage id="dittnavkontor.apningstider" />
          </Heading>
          <thead className={"sr-only"}>
            <tr>
              <th scope={"col"}>Ukedag</th>
              <th scope={"col"}>Tidsrom</th>
              <th scope={"col"}>Kommentar</th>
            </tr>
          </thead>
          <tbody>
            <Apningstid
              apningstid={publikumsmottak[valgtMottakId].aapningMandag}
            />
            <Apningstid
              apningstid={publikumsmottak[valgtMottakId].aapningTirsdag}
            />
            <Apningstid
              apningstid={publikumsmottak[valgtMottakId].aapningOnsdag}
            />
            <Apningstid
              apningstid={publikumsmottak[valgtMottakId].aapningTorsdag}
            />
            <Apningstid
              apningstid={publikumsmottak[valgtMottakId].aapningFredag}
            />
          </tbody>
        </table>
      </div>
      {publikumsmottak[valgtMottakId].aapningAndre && (
        <>
          <Heading size={"xsmall"} level={"3"}>
            <FormattedMessage id="dittnavkontor.andreapningstider" />
          </Heading>
          <div className="apningstid__container">
            {publikumsmottak[valgtMottakId].aapningAndre!.map(
              (apningstid, id) => (
                <Apningstid key={id} apningstid={apningstid} />
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Apningstider;
