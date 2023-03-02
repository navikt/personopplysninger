import React from "react";
import { Publikumsmottak } from "types/enhetKontaktInfo";
import FormaterApningstider from "./FormaterApningstider";

interface Props {
  publikumsmottak: Publikumsmottak[];
  valgtMottakId: number;
}

const Apningstider = (props: Props) => {
  const { publikumsmottak, valgtMottakId } = props;
  const mottak = publikumsmottak[valgtMottakId];

  const { aapningstider, spesielleAapningstider } = mottak;

  return (
    <div className="apningstider">
      {aapningstider.length > 0 && (
        <FormaterApningstider
          headingId={"dittnavkontor.apningstider"}
          apningstider={aapningstider}
        />
      )}
      {spesielleAapningstider.length > 0 && (
        <FormaterApningstider
          headingId={"dittnavkontor.spesielleapningstider"}
          apningstider={spesielleAapningstider}
        />
      )}
    </div>
  );
};

export default Apningstider;
