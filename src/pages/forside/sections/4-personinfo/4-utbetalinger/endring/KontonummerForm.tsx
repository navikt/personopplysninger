import React, { useState } from "react";
import { Form, FormContext, Validation } from "calidation";
import { Button, Radio, RadioGroup } from "@navikt/ds-react";
import OpprettEllerEndreNorskKontonr, {
  OutboundNorskKontonummer,
  setOutboundNorskKontonummer,
} from "./norsk-bankkonto/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank, {
  OutboundUtenlandsbankonto,
  setOutboundUtenlandsbankonto,
} from "./utenlandsk-bankkonto/UtenlandsBankkonto";
import { FormattedMessage, useIntl } from "react-intl";
import HttpFeilmelding, {
  Feilmelding,
} from "../../../../../../components/httpFeilmelding/HttpFeilmelding";
import Kilde from "../../../../../../components/kilde/Kilde";
import { normalizeNummer } from "../../../../../../utils/formattering";
import {
  fetchPersonInfo,
  postKontonummer,
} from "../../../../../../clients/apiClient";
import { PersonInfo } from "../../../../../../types/personInfo";
import { useStore } from "../../../../../../store/Context";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  personident?: { verdi: string; type: string };
  kontonr?: string;
  settOpprettEllerEndre: (arg: boolean) => void;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const KontonummerForm = (props: Props) => {
  const { kontonr, utenlandskbank, personident, settOpprettEllerEndre } = props;
  const { formatMessage: msg } = useIntl();
  const [loading, settLoading] = useState<boolean>(false);
  const [alert, settAlert] = useState<Feilmelding | null>(null);
  const [, dispatch] = useStore();

  const initialValues = {
    norskEllerUtenlandsk: kontonr
      ? NORSK
      : utenlandskbank
      ? UTENLANDSK
      : undefined,
  };

  const config = {
    norskEllerUtenlandsk: {
      isRequired: msg({ id: "felter.type.velg" }),
    },
  };

  const submitEndre = (context: FormContext) => {
    const { isValid, fields } = context;
    if (isValid) {
      type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
      const outbound: { [key: string]: () => Outbound } = {
        NORSK: () => {
          fields.kontonummer = normalizeNummer(fields.kontonummer);
          return setOutboundNorskKontonummer(context);
        },
        UTENLANDSK: () => setOutboundUtenlandsbankonto(context),
      };

      settLoading(true);
      postKontonummer(outbound[fields.norskEllerUtenlandsk]())
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: Feilmelding) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

  return (
    <Form onSubmit={submitEndre}>
      <Validation config={config} initialValues={initialValues}>
        {({ submitted, isValid, errors, setField, fields }) => {
          return (
            <RadioGroup
              legend={msg({ id: "felter.kontonummer.grouplegend" })}
              error={submitted && errors.norskEllerUtenlandsk}
              value={fields.norskEllerUtenlandsk}
            >
              <Radio
                value={NORSK}
                onChange={(e) =>
                  setField({ norskEllerUtenlandsk: e.target.value })
                }
              >
                {msg({ id: "felter.kontonummervalg.norsk" })}
              </Radio>
              {fields.norskEllerUtenlandsk === NORSK && (
                <OpprettEllerEndreNorskKontonr
                  personident={personident}
                  kontonummer={kontonr}
                />
              )}
              <Radio
                value={UTENLANDSK}
                onChange={(e) =>
                  setField({ norskEllerUtenlandsk: e.target.value })
                }
              >
                {msg({ id: "felter.kontonummervalg.utenlandsk" })}
              </Radio>
              {fields.norskEllerUtenlandsk === UTENLANDSK && (
                <OpprettEllerEndreUtenlandsbank
                  personident={personident}
                  utenlandskbank={utenlandskbank}
                />
              )}
              <div className="utbetalinger__knapper">
                <div className="utbetalinger__knapp">
                  <Button
                    variant={"primary"}
                    type={"submit"}
                    disabled={submitted && !isValid}
                    loading={loading}
                  >
                    <FormattedMessage id={"side.lagre"} />
                  </Button>
                </div>
                <div className="utbetalinger__knapp">
                  <Button
                    variant={"tertiary"}
                    type={"button"}
                    disabled={loading}
                    onClick={() => settOpprettEllerEndre(false)}
                  >
                    <FormattedMessage id={"side.avbryt"} />
                  </Button>
                </div>
              </div>
              {alert && <HttpFeilmelding {...alert} />}
            </RadioGroup>
          );
        }}
      </Validation>
      <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
    </Form>
  );
};

export default KontonummerForm;
