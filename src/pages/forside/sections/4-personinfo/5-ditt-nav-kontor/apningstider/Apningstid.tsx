import React from "react";
import { Aapningstid } from "types/enhetKontaktInfo";
import { print } from "utils/text";

interface Props {
  apningstid?: Aapningstid;
}

const Apningstid = (props: Props) =>
  props.apningstid ? (
    <tr>
      <td>{print(props.apningstid.dag)}</td>
      <td>
        {props.apningstid.stengt === "true"
          ? "Stengt"
          : `${print(props.apningstid.fra)} - ${print(props.apningstid.til)}`}
      </td>
      <td>{print(props.apningstid.kommentar)}</td>
    </tr>
  ) : null;

export default Apningstid;