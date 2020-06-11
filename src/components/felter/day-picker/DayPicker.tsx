import React, { useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import { formatDate, parseDate } from "./utils";
import { DayModifiers } from "react-day-picker";
import moment from "moment";
import cls from "classnames";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { FormattedMessage } from "react-intl";
import { PopoverOrientering } from "nav-frontend-popover";

interface Props {
  label?: string;
  value?: string;
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

  const iMorgen = moment(new Date()).add(1, "days").toDate();
  const etArFrem = moment(new Date()).add(1, "year").toDate();

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

    // Reset til kl 12 for sammenligning
    const klTolvValgtDag = new Date(new Date(nyValgtDag).setHours(12, 0, 0, 0));
    const klTolvIMorgen = new Date(new Date(iMorgen).setHours(12, 0, 0, 0));
    const klTolvEtArFrem = new Date(
      new Date(klTolvValgtDag).setFullYear(
        new Date(klTolvIMorgen).getFullYear() + 1
      )
    );

    if (klTolvValgtDag && !isDisabled) {
      if (klTolvValgtDag >= klTolvIMorgen && klTolvValgtDag <= klTolvEtArFrem) {
        props.onChange(moment(klTolvValgtDag).format("YYYY-MM-DD"));
      } else {
        onErrors(ugyldigTekst);
      }
    }
    if (!klTolvValgtDag && !isEmpty) {
      onErrors(ugyldigTekst);
    }
  };

  const inputClasses = cls({
    "skjemaelement__input--harFeil": submitted && error,
    "skjemaelement__input input--m": true,
  });

  return (
    <div className="skjemaelement">
      <div className="ekf__header">
        {label && <div className="skjemaelement__label">{label}</div>}
        <Hjelpetekst type={PopoverOrientering.Hoyre} id={"hjelpetekst"}>
          <FormattedMessage
            id={"adresse.hjelpetekster.gyldigtil"}
            values={{
              b: (text: string) => <b>{text}</b>,
            }}
          />
        </Hjelpetekst>
      </div>
      <DayPickerInput
        value={valgtDag}
        format={props.format}
        placeholder={props.placeholder}
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={onChange}
        inputProps={{
          className: inputClasses,
        }}
        dayPickerProps={{
          selectedDays: valgtDag,
          locale: props.locale,
          localeUtils: MomentLocaleUtils,
          fromMonth: iMorgen,
          toMonth: etArFrem,
          disabledDays: [{ before: iMorgen, after: etArFrem }],
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
  locale: "nb",
};

export default DayPicker;
