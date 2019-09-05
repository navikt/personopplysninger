import React from "react";
import { Input, NavFrontendInputProps } from "nav-frontend-skjema";

type InputProps = Omit<NavFrontendInputProps, "onChange">;
interface Props extends InputProps {
  value: string;
  error: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
}

const EndreKontonummerFelt = (props: Props) => {
  const { value, onChange, submitted, error, ...restProps } = props;
  return (
    <Input
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      feil={submitted && error ? { feilmelding: error } : undefined}
      {...restProps}
    />
  );
};

export default EndreKontonummerFelt;
