import React from "react";
import { Aapningstid } from "types/enhetKontaktInfo";
import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import Apningstid from "./Apningstid";

interface Props {
  apningstider: Aapningstid[];
  headingId: string;
}

const FormaterApningstider = (props: Props) => {
  const { apningstider, headingId } = props;

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
          <th scope={"col"}>Ukedag</th>
          <th scope={"col"}>Tidsrom</th>
          <th scope={"col"}>Kommentar</th>
        </tr>
      </thead>
      <tbody>
        {apningstider.map((apningstid) => (
          <Apningstid
            key={`${headingId} + ${apningstid.dag}`}
            apningstid={apningstid}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FormaterApningstider;
