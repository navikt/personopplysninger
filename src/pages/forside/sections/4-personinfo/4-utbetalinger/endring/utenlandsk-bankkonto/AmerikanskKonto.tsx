import React from "react";
import BankkodeField from "./felter/BankkodeField";
import AdresseFields from "./felter/AdresseFields";

const AmerikanskKonto = () => {
  return (
    <>
      <BankkodeField />
      <div className="utbetalinger__adressefelter">
        <AdresseFields />
      </div>
    </>
  );
};

export default AmerikanskKonto;
