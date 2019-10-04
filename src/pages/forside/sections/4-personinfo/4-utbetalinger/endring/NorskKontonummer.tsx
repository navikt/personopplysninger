import React from "react";
import { Input } from "nav-frontend-skjema";
import { FormContext, Validation } from "calidation";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { sjekkForFeil } from "../../../../../../utils/validators";

interface Props {
  kontonummer?: string;
}

export interface OutboundNorskKontonummer {
  value: string;
}

const OpprettEllerEndreNorskKontonr = (props: Props & InjectedIntlProps) => {
  const { kontonummer, intl } = props;

  const initialValues = {
    ...(kontonummer && {
      kontonummer: kontonummer
    })
  };

  const formConfig = {
    kontonummer: {
      isRequired: intl.messages["validation.kontonummer.pakrevd"],
      isNumber: intl.messages["validation.kontonummer.siffer"],
      isExactLength: {
        message: intl.messages["validation.kontonummer.elleve"],
        length: 11
      },
      isMod11: {
        message: intl.messages["validation.kontonummer.mod11"]
      }
    }
  };

  return (
    <Validation config={formConfig} initialValues={initialValues}>
      {({ errors, fields, submitted, setField }) => (
        <>
          <div className="utbetalinger__input input--m">
            <Input
              bredde={"M"}
              maxLength={11}
              value={fields.kontonummer}
              label={intl.messages["felter.kontonummer.label"]}
              onChange={e => setField({ kontonummer: e.target.value })}
              feil={sjekkForFeil(submitted, errors.kontonummer)}
            />
          </div>
        </>
      )}
    </Validation>
  );
};

export const setOutboundNorskKontonummer = (c: FormContext) => {
  const { fields } = c;
  const { kontonummer } = fields;
  return {
    value: kontonummer
  };
};

export default injectIntl(OpprettEllerEndreNorskKontonr);
