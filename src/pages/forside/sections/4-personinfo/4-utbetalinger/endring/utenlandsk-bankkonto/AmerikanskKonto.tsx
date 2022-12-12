import React, { ForwardedRef } from "react";
import RetningsnummerField from "./felter/RetningsnummerField";
import BankkodeField from "./felter/BankkodeField";
import AdresseFields from "./felter/AdresseFields";

interface Props {}

const AmerikanskKonto = React.forwardRef((_, ref: ForwardedRef<any>) => {
  return (
    <>
      <div className="utbetalinger__bankkode-rad">
        <div className="utbetalinger__bankkode-kolonne">
          <RetningsnummerField ref={ref} />
        </div>
        <div className="utbetalinger__bankkode-kolonne">
          <BankkodeField ref={ref} />
        </div>
      </div>
      <div className="utbetalinger__adressefelter">
        <AdresseFields ref={ref} />
      </div>
    </>
  );
});

export default AmerikanskKonto;
