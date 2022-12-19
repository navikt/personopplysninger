import React from "react";
import RetningsnummerField from "./felter/RetningsnummerField";
import BankkodeField from "./felter/BankkodeField";
import AdresseFields from "./felter/AdresseFields";

const AmerikanskKonto = () => {
  return (
    <>
      <div className="utbetalinger__bankkode-rad">
        <div className="utbetalinger__bankkode-kolonne">
          <RetningsnummerField />
        </div>
        <div className="utbetalinger__bankkode-kolonne">
          <BankkodeField />
        </div>
      </div>
      <div className="utbetalinger__adressefelter">
        <AdresseFields />
      </div>
    </>
  );
};

export default AmerikanskKonto;
