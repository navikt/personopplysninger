import React from "react";
import NAVSelect from "components/felter/select/NAVSelect";
import { UNKNOWN } from "utils/text";

interface Props {
  option?: OptionType;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: OptionType) => void;
  hjelpetekst?: string;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Land {
  kode: string;
  tekst: string;
}

export const EmptyOption = { label: "", value: UNKNOWN };
const SelectCO = (props: Props) => {
  const options = [
    {
      label: "",
      value: UNKNOWN,
    },
    {
      label: "C/O",
      value: "CO",
    },
    {
      label: "V/",
      value: "V",
    },
  ];

  return (
    <div className={"KodeverkSelect__margin"}>
      <NAVSelect
        bredde={"input--s"}
        label={props.label}
        error={props.error}
        options={options}
        option={props.option}
        submitted={props.submitted}
        onChange={props.onChange}
        hjelpetekst={props.hjelpetekst}
      />
    </div>
  );
};

export default SelectCO;
