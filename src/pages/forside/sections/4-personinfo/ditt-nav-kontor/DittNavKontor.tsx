import React from "react";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/adresser.svg";
import { EnhetKontaktInfo } from "../../../../../types/adresser/enhetKontaktInfo";
import { GeografiskTilknytning } from "../../../../../types/adresser";

interface Props {
  enhetKontaktInfo: EnhetKontaktInfo;
  geografiskTilknytning: GeografiskTilknytning;
}

const DittNavKontor = (props: Props) => {
  return (
    <Box
      id="dittnavkontor"
      tittel="dittnavkontor.tittel"
      beskrivelse="dittnavkontor.beskrivelse"
      icon={adresseIkon}
    >
      <div>Test</div>
    </Box>
  );
};

export default DittNavKontor;
