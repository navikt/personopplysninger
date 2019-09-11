import React, { RefObject, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Input, NavFrontendInputProps } from "nav-frontend-skjema";
import moment from "moment";
import "react-day-picker/lib/style.css";

import MomentLocaleUtils from "react-day-picker/moment";
import { sjekkForFeil } from "../../../utils/validators";

type InputProps = Omit<NavFrontendInputProps, "onChange">;
interface Props extends InputProps {
  value: string;
  error: string | null;
  submitted: boolean;
  onChange: (value: string) => void;
  onErrors: (value: string) => void;
}

const formatDate = (date: Date, format: string, locale: string) =>
  moment(date)
    .locale(locale)
    .format(format);

const parseDate = (
  date: string,
  format: string,
  locale: string
): Date | undefined =>
  moment(date, format, true).isValid()
    ? moment(date, format)
        .locale(locale)
        .toDate()
    : undefined;

const DayPicker = (props: Props) => {
  const {
    value,
    onChange,
    onErrors,
    submitted,
    error,
    label,
    ...restProps
  } = props;

  const [valgtDag, settValgtDag] = useState<Date | undefined>(undefined);
  const [lokalFeil, settLokalFeil] = useState();
  const dateNow = new Date(Date.now());
  const dateOneYearAhead = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  return (
    <DayPickerInput
      value={valgtDag}
      format={"DD.MM.YYYY"}
      placeholder={"DD.MM.YYYY"}
      formatDate={formatDate}
      parseDate={parseDate}
      onDayChange={(nyValgtDag, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        const isEmpty = input.value && !input.value.trim();
        const isDisabled = modifiers.disabled === true;

        settValgtDag(nyValgtDag);
        if (nyValgtDag && !isDisabled) {
          onChange(moment(nyValgtDag).format("YYYY.MM.DD"));
        }
        if (!nyValgtDag && !isEmpty) {
          settLokalFeil("Invalid date");
        }
      }}
      component={React.forwardRef((p, ref) => (
        <Input
          key={"day-picker"}
          label={label}
          ref={ref as RefObject<Input>}
          feil={sjekkForFeil(submitted, error)}
          {...p}
        />
      ))}
      dayPickerProps={{
        selectedDays: valgtDag,
        numberOfMonths: 2,
        locale: "nb",
        localeUtils: MomentLocaleUtils,
        month: dateOneYearAhead,
        fromMonth: dateNow,
        toMonth: dateOneYearAhead,
        disabledDays: [
          {
            before: dateNow,
            after: dateOneYearAhead
          }
        ]
      }}
      inputProps={{
        ...restProps
      }}
    />
  );
};
export default DayPicker;
