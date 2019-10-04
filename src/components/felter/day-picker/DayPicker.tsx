import React, { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import { formatDate, parseDate } from "./utils";
import { DayModifiers } from "react-day-picker";
import moment from "moment";
import cls from "classnames";
import { dateOneYearAhead } from "../../../utils/date";

interface Props {
  label?: string;
  value: string;
  error: string | null;
  format: string;
  locale: string;
  submitted: boolean;
  placeholder: string;
  ugyldigTekst: string;
  onChange: (value: string) => void;
  onErrors: (value: string) => void;
}

const DayPicker = (props: Props) => {
  const { label, onErrors, submitted, error, ugyldigTekst } = props;
  const [valgtDag, settValgtDag] = useState<Date | undefined>(undefined);
  const dateNow = new Date(Date.now());

  useEffect(() => {
    if (props.value) {
      settValgtDag(moment(props.value).toDate());
    }
  }, [props.value]);

  const onChange = (
    nyValgtDag: Date,
    modifiers: DayModifiers,
    dayPickerInput: DayPickerInput
  ) => {
    settValgtDag(nyValgtDag);
    const input = dayPickerInput.getInput();
    const isEmpty = input.value && !input.value.trim();
    const isDisabled = modifiers.disabled === true;
    if (nyValgtDag && !isDisabled) {
      props.onChange(moment(nyValgtDag).format("YYYY-MM-DD"));
    }
    if (!nyValgtDag && !isEmpty) {
      onErrors(ugyldigTekst);
    }
  };

  const inputClasses = cls({
    "skjemaelement__input--harFeil": submitted && error,
    "skjemaelement__input input--m": true
  });

  return (
    <div className="skjemaelement">
      {label && <div className="skjemaelement__label">{label}</div>}
      <DayPickerInput
        value={valgtDag}
        format={props.format}
        placeholder={props.placeholder}
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={onChange}
        inputProps={{
          className: inputClasses
        }}
        dayPickerProps={{
          selectedDays: valgtDag,
          locale: props.locale,
          localeUtils: MomentLocaleUtils,
          fromMonth: dateNow,
          toMonth: dateOneYearAhead,
          disabledDays: [
            {
              before: dateNow,
              after: dateOneYearAhead
            }
          ]
        }}
      />
      {submitted && error && (
        <div className="skjemaelement__feilmelding">{error}</div>
      )}
    </div>
  );
};

DayPicker.defaultProps = {
  format: "DD.MM.YYYY",
  placeholder: "DD.MM.ÅÅÅÅ",
  locale: "nb"
};

export default DayPicker;
