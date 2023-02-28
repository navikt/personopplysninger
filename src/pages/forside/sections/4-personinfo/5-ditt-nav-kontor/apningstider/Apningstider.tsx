import React from "react";
import { Aapningstid, Publikumsmottak } from "types/enhetKontaktInfo";
import FormaterApningstider from "./FormaterApningstider";

interface Props {
  publikumsmottak: Publikumsmottak[];
  valgtMottakId: number;
}

const UKEDAGER = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

const Apningstider = (props: Props) => {
  const { publikumsmottak, valgtMottakId } = props;
  const mottak = publikumsmottak[valgtMottakId];
  const aapningstider = mottak.aapningstider;

  const ordinaereAapningstider = UKEDAGER.map((dag) =>
    aapningstider?.find((a) => a.dag === dag)
  ).filter(Boolean) as Aapningstid[];

  const andreAapningstider = aapningstider?.filter(
    (a) => !UKEDAGER.includes(a.dag)
  );

  return (
    <div className="apningstider">
      {ordinaereAapningstider && ordinaereAapningstider.length > 0 && (
        <FormaterApningstider
          headingId={"dittnavkontor.apningstider"}
          apningstider={ordinaereAapningstider}
        />
      )}
      {andreAapningstider && andreAapningstider.length > 0 && (
        <FormaterApningstider
          headingId={"dittnavkontor.andreapningstider"}
          apningstider={andreAapningstider}
        />
      )}
    </div>
  );
};

export default Apningstider;
