import React from "react";
import { Aapningstid } from "../../../../../../types/enhetKontaktInfo";
import { print } from "../../../../../../utils/text";

interface Props {
  apningstid?: Aapningstid;
}

const Apningstid = (props: Props) =>
  props.apningstid ? (
    <div className="apningstid__row">
      <div className="apningstid__column apningstid__dag">
        {print(props.apningstid.dag)}
      </div>
      <div className="apningstid__column apningstid__tidspunkt">
        {props.apningstid.stengt === "true"
          ? "Stengt"
          : `${print(props.apningstid.fra)} - ${print(props.apningstid.til)}`}
      </div>
      <div className="apningstid__column apningstid__kommentar">
        {print(props.apningstid.kommentar)}
      </div>
    </div>
  ) : null;

export default Apningstid;
