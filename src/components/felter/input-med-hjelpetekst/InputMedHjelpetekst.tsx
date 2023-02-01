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
    return (
      <div className="skjemaelement">
        <div className="ekf__input">
          <TextField
            id={id}
            label={
              <LabelMedHjelpetekst label={label} hjelpetekst={hjelpetekst} />
            }
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
