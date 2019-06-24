import React from "react";
import { Aapningstid } from "../../types/enhetKontaktInfo";

interface Props {
  apningstid?: Aapningstid;
}

const Apningstid = (props: Props) =>
  props.apningstid ? (
    <div className="apningstid__row">
      <div className="apningstid__column">{props.apningstid.dag}</div>
      <div className="apningstid__column">
        {props.apningstid.stengt === "true"
          ? "Stengt"
          : `${props.apningstid.fra} - ${props.apningstid.til}`}
      </div>
      <div className="apningstid__column">{props.apningstid.kommentar}</div>
    </div>
  ) : null;

export default Apningstid;
