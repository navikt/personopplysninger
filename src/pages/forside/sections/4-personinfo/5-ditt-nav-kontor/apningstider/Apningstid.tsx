import React from "react";
import { Aapningstid } from "types/enhetKontaktInfo";
import { print } from "utils/text";

interface Props {
  apningstid?: Aapningstid;
}

const Apningstid = (props: Props) =>
  props.apningstid ? (
    <tr>
      <td>{props.apningstid.dag || "Alle dager"}</td>
      <td>
        {props.apningstid.stengt === "true"
          ? "Stengt"
          : `${print(props.apningstid.fra)} - ${print(props.apningstid.til)}`}
      </td>
      <td>{print(props.apningstid.kommentar)}</td>
    </tr>
  ) : null;

export default Apningstid;
