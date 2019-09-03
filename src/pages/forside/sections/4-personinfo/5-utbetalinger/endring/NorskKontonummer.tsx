import React from "react";
import { Input } from "nav-frontend-skjema";

interface Props {}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
  return (
    <div style={{ width: "50%" }}>
      <Input label={"Kontonummer"} />
    </div>
  );
};

export default OpprettEllerEndreNorskKontonr;
