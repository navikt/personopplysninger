import React from "react";
import { Input } from "nav-frontend-skjema";
import { FormContext, Validation, ValidatorContext } from "calidation";
import { useIntl } from "react-intl";
import { useStore } from "../../../../../../store/Context";

interface Props {
  personident?: { verdi: string; type: string };
  kontonummer?: string;
}

export interface OutboundNorskKontonummer {
  value: string;
}

interface Fields {
  kontonummer?: string;
}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const [{ formKey }] = useStore();
  const { kontonummer } = props;

  const initialValues: Fields = {
    ...(kontonummer && {
      kontonummer: kontonummer,
    }),
  };

  const formConfig = {
    kontonummer: {
      isRequired: msg({ id: "validation.kontonummer.pakrevd" }),
      isNumber: msg({ id: "validation.kontonummer.siffer" }),
      isExactLength: {
        message: msg({ id: "validation.kontonummer.elleve" }),
        length: 11,
      },
      isMod11: {
        message: msg({ id: "validation.kontonummer.mod11" }),
      },
      isNotYourSSN: {
        message: msg({ id: "validation.kontonummer.idnr" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.kontonummer === props.personident?.verdi,
      },
    },
  };

  return (
    <Validation key={formKey} config={formConfig} initialValues={initialValues}>
      {({ errors, fields, submitted, setField }) => (
        <>
          <div className="utbetalinger__input input--m">
            <Input
              bredde={"M"}
              maxLength={16}
              value={fields.kontonummer}
              label={msg({ id: "felter.kontonummer.label" })}
              onChange={(e) =>
                setField({ kontonummer: e.target.value.replace(/\D/g, "") })
              }
              feil={submitted && errors.kontonummer}
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
    value: kontonummer,
  };
};

export default OpprettEllerEndreNorskKontonr;
