import React from "react";
import { Aapningstid } from "types/enhetKontaktInfo";
import { print } from "utils/text";
import dayjs from "dayjs";

interface Props {
  apningstid?: Aapningstid;
  isSpesielleAapningstider?: boolean;
}

const Apningstid = (props: Props) => {
  const { apningstid, isSpesielleAapningstider } = props;
  return apningstid ? (
    <tr>
      <td>
        {print(
          isSpesielleAapningstider
            ? apningstid.dato && dayjs(apningstid.dato).format("DD.MM.YYYY")
            : apningstid.dag
        )}
      </td>
      <td>
        {apningstid.stengt === "true"
          ? "Stengt"
          : `${print(apningstid.fra)} - ${print(apningstid.til)}`}
      </td>
      <td>{print(apningstid.kommentar)}</td>
    </tr>
  ) : null;
};

export default Apningstid;
