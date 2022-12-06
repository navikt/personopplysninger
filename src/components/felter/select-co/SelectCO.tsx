import React from "react";
import NAVSelect from "components/felter/select/NAVSelect";
import { UNKNOWN } from "utils/text";

interface Props {
  id?: string;
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

export const SelectOptionEmpty = { label: "", value: UNKNOWN };
export const SelectOptionCO = { label: "C/O", value: "CO" };
export const SelectOptionV = { label: "V/", value: "V" };

const SelectCO = (props: Props) => {
  const options = [SelectOptionEmpty, SelectOptionCO, SelectOptionV];
  return (
    <div className={"KodeverkSelect__margin"}>
      <NAVSelect
        id={props.id}
        htmlSize={20}
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

// Utils
export const initialCoType = (coAdressenavn?: string) =>
  coAdressenavn?.includes("V/")
    ? SelectOptionV
    : coAdressenavn?.includes("C/O")
    ? SelectOptionCO
    : SelectOptionEmpty;

export const initialCoAdressenavn = (coAdressenavn?: string) =>
  coAdressenavn?.replace("V/ ", "").replace("C/O ", "");

export default SelectCO;
