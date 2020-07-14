import React, { Fragment } from "react";
import { Input, InputProps } from "nav-frontend-skjema";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { FormattedMessage } from "react-intl";
import { PopoverOrientering } from "nav-frontend-popover";

type IProps = Omit<InputProps, "onChange">;
interface Props extends IProps {
  value?: string;
  error?: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
  hjelpetekst?: string;
}

const EndreKontonummerFelt = ({
  value,
  onChange,
  submitted,
  error,
  label,
  hjelpetekst,
  ...restProps
}: Props) => {
  return (
    <div>
      <div className="ekf__header">
        {label && <div className="skjemaelement__label">{label}</div>}
        {hjelpetekst && (
          <Hjelpetekst type={PopoverOrientering.Hoyre}>
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
          </Hjelpetekst>
        )}
      </div>
      <div className="ekf__input">
        <Input
          label={""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          feil={submitted && error}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default EndreKontonummerFelt;
