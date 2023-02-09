import React from "react";
import { FormattedMessage } from "react-intl";
import { Alert } from "@navikt/ds-react";
import BickodeField from "./felter/BickodeField";
import RetningsnummerField from "./felter/RetningsnummerField";
import BankkodeField from "./felter/BankkodeField";
import AdresseFields from "./felter/AdresseFields";

interface Props {
  valgtLand: string;
}

const LandMedBankkode = (props: Props) => {
  const { valgtLand } = props;

  return (
    <>
      <div className="utbetalinger__bic-bankkode">
        <div className="utbetalinger__alert">
          <Alert variant="warning">
            <FormattedMessage
              id="felter.landetbrukerbankkode.advarsel"
              values={{
                land: valgtLand,
                span: (text) => <span className="capitalize">{text}</span>,
              }}
            />
          </Alert>
        </div>
        <BickodeField />
        <div className="utbetalinger__bankkode-rad">
          <div className="utbetalinger__bankkode-kolonne">
            <RetningsnummerField />
          </div>
          <div className="utbetalinger__bankkode-kolonne">
            <BankkodeField />
          </div>
        </div>
      </div>
      <div className="utbetalinger__adressefelter">
        <AdresseFields />
      </div>
    </>
  );
};
export default LandMedBankkode;
