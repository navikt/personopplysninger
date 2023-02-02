import React, { ForwardedRef } from "react";
import { TextField, TextFieldProps } from "@navikt/ds-react";
import LabelMedHjelpetekst from "../label-med-hjelpetekst/LabelMedHjelpetekst";

interface Props extends TextFieldProps {
  id?: string;
  value?: string;
  error?: string | null;
  hjelpetekst?: string;
}

const EndreKontonummerFelt = React.forwardRef(
  (
    { id, value, error, htmlSize, label, hjelpetekst, ...restProps }: Props,
    ref: ForwardedRef<any>
  ) => {
    const labelId = id + "_label";

    return (
      <div className="skjemaelement">
        <div className="ekf__header">
          <LabelMedHjelpetekst
            label={label}
            hjelpetekst={hjelpetekst}
            labelId={labelId}
            labelForId={id}
          />
        </div>
        <div className="ekf__input">
          <TextField
            label={undefined}
            id={id}
            aria-labelledby={labelId}
            value={value}
            htmlSize={htmlSize}
            error={error}
            ref={ref}
            {...restProps}
          />
        </div>
      </div>
    );
  }
);

export default EndreKontonummerFelt;
