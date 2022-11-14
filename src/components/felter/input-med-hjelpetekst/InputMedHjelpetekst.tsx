import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";
import { TextField, TextFieldProps } from "@navikt/ds-react";

type IProps = Omit<TextFieldProps, "onChange">;
interface Props extends IProps {
  id?: string;
  value?: string;
  error?: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
  hjelpetekst?: string;
}

const EndreKontonummerFelt = ({
  id,
  value,
  onChange,
  submitted,
  error,
  htmlSize,
  label,
  hjelpetekst,
  ...restProps
}: Props) => {
  return (
    <div className="skjemaelement">
      <div className="ekf__header">
        {label && <div className="skjemaelement__label">{label}</div>}
        {hjelpetekst && (
          <CustomHelpText placement={"right"}>
            <FormattedMessage
              id={hjelpetekst}
              values={{
                b: (text: string) => <b>{text}</b>,
                p: (...chunks: string[]) => (
                  <p>
                    {chunks.map((chunk, i) => (
                      <Fragment key={i}>{chunk}</Fragment>
                    ))}
                  </p>
                ),
              }}
            />
          </CustomHelpText>
        )}
      </div>
      <div className="ekf__input">
        <TextField
          id={id}
          label={""}
          value={value}
          htmlSize={htmlSize}
          onChange={(e) => onChange(e.target.value)}
          error={submitted && error}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default EndreKontonummerFelt;
