import React from "react";
import { Adresser as IAdresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Folkeregisteret from "./visning/Folkeregisteret";
import AndreAdresser from "./visning/AndreAdresser";

interface Props {
  adresser: IAdresser;
}

const Adresser = (props: Props) => {
  const { adresser } = props;
  const { kontaktadresser, bostedsadresse, deltBosted, oppholdsadresse } = adresser;

  const kontaktadresserFreg = kontaktadresser.filter(adr => adr.kilde === "freg");
  const kontaktadresserPdl = kontaktadresser.filter(adr => adr.kilde === "pdl");
  const kontaktadressePdl = kontaktadresserPdl.length === 0 ? null : kontaktadresserPdl[0];

  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
      visAnkerlenke={true}
    >
      <div className="adresse__box">
        {driftsmeldinger.pdl && (
            <div style={{ padding: "1rem 0" }}>
              <AlertStripeAdvarsel>{driftsmeldinger.pdl}</AlertStripeAdvarsel>
            </div>
        )}

        <Folkeregisteret bostedsadresse={bostedsadresse}
                         deltBosted={deltBosted}
                         oppholdsadresse={oppholdsadresse}
                         kontaktadresser={kontaktadresserFreg}/>

        {kontaktadressePdl && <AndreAdresser kontaktadresse={kontaktadressePdl}/>}
      </div>
    </Box>
  );
};

export default Adresser;
