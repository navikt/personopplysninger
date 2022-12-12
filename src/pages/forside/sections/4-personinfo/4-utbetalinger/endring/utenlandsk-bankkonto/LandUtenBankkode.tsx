import React, { ForwardedRef } from "react";
import BickodeField from "./felter/BickodeField";

const LandUtenBankkode = React.forwardRef((_, ref: ForwardedRef<any>) => {
  return (
    <div className="utbetalinger__bank-identifier">
      <BickodeField ref={ref} />
    </div>
  );
});

export default LandUtenBankkode;
