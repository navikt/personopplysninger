import React, { ForwardedRef } from "react";
import { FormattedMessage } from "react-intl";
import { Alert } from "@navikt/ds-react";
import BickodeField from "./felter/BickodeField";
import RetningsnummerField from "./felter/RetningsnummerField";
import BankkodeField from "./felter/BankkodeField";
import AdresseFields from "./felter/AdresseFields";

interface Props {
  valgtLand: string;
}

const LandMedBankkode = React.forwardRef(
  (props: Props, ref: ForwardedRef<any>) => {
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
                  span: (text: string) => (
                    <span className="capitalize">{text}</span>
                  ),
                }}
              />
            </Alert>
          </div>
          <BickodeField ref={ref} />
          <div className="utbetalinger__bankkode-rad">
            <div className="utbetalinger__bankkode-kolonne">
              <RetningsnummerField ref={ref} />
            </div>
            <div className="utbetalinger__bankkode-kolonne">
              <BankkodeField ref={ref} />
            </div>
          </div>
        </div>
        <div className="utbetalinger__adressefelter">
          <AdresseFields ref={ref} />
        </div>
      </>
    );
  }
);

export default LandMedBankkode;
