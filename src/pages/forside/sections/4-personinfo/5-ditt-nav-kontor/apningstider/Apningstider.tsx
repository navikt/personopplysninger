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
        <FormaterApningstider apningstider={aapningstider} />
      )}
      {spesielleAapningstider.length > 0 && (
        <FormaterApningstider
          apningstider={spesielleAapningstider}
          isSpesielleAapningstider={true}
        />
      )}
    </div>
  );
};

export default Apningstider;
