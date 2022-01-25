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
  const { kontaktadresser, bostedsadresse, deltBosted, oppholdsadresse, oppholdsadresser } = adresser;

  const kontaktadresserFreg = kontaktadresser.filter(adr => adr.kilde === "freg");
  const kontaktadressePdl = kontaktadresser.find(adr => adr.kilde === "pdl");

  let oppholdsadresseFreg = oppholdsadresser?.find(adr => adr.kilde === "freg");
  const oppholdsadressePdl = oppholdsadresser?.find(adr => adr.kilde === "pdl");

  if (oppholdsadresseFreg == null) {
    oppholdsadresseFreg = oppholdsadresse;
  }

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
                         oppholdsadresse={oppholdsadresseFreg}
                         kontaktadresser={kontaktadresserFreg}/>

        {(kontaktadressePdl || oppholdsadressePdl) && <AndreAdresser kontaktadresse={kontaktadressePdl}
                                                                     oppholdsadresse={oppholdsadressePdl}/>}
      </div>
    </Box>
  );
};

export default Adresser;
