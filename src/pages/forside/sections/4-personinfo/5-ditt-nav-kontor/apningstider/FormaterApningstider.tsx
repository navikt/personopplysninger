import React from "react";
import { Aapningstid } from "types/enhetKontaktInfo";
import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import Apningstid from "./Apningstid";

interface Props {
  apningstider: Aapningstid[];
  isSpesielleAapningstider?: boolean;
}

const FormaterApningstider = (props: Props) => {
  const { apningstider, isSpesielleAapningstider } = props;
  const headingId = isSpesielleAapningstider
    ? "dittnavkontor.spesielleapningstider"
    : "dittnavkontor.apningstider";

  return (
    <table className="apningstider__table">
      <Heading
        as="caption"
        size={"xsmall"}
        level={"3"}
        className={"apningstider__caption"}
      >
        <FormattedMessage id={headingId} />
      </Heading>
      <thead className={"sr-only"}>
        <tr>
          <th scope={"col"}>{isSpesielleAapningstider ? "Dato" : "Dag"}</th>
          <th scope={"col"}>Tidsrom</th>
          <th scope={"col"}>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {apningstider.map((apningstid) => (
          <Apningstid
            key={`${headingId} + ${
              isSpesielleAapningstider ? apningstid.dato : apningstid.dag
            }`}
            apningstid={apningstid}
            isSpesielleAapningstider={isSpesielleAapningstider}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FormaterApningstider;
