import { Alert } from "@navikt/ds-react";
import adresseIkon from "@/assets/img/Adresse.svg";
import Box from "@/components/box/Box";
import driftsmeldinger from "@/driftsmeldinger";
import type { Adresser as IAdresser } from "@/types/adresser";
import adresseStyles from "./Adresser.module.css";
import AndreAdresser from "./visning/AndreAdresser";
import Folkeregisteret from "./visning/Folkeregisteret";

interface Props {
    adresser: IAdresser;
}

const Adresser = (props: Props) => {
    const { adresser } = props;
    const { kontaktadresser, bostedsadresse, deltBosted, oppholdsadresser } = adresser;

    const kontaktadresserFreg = kontaktadresser.filter((adr) => adr.kilde === "freg");
    const kontaktadressePdl = kontaktadresser.find((adr) => adr.kilde === "pdl");

    const oppholdsadresseFreg = oppholdsadresser?.find((adr) => adr.kilde === "freg");
    const oppholdsadressePdl = oppholdsadresser?.find((adr) => adr.kilde === "pdl");

    return (
        <Box id="adresser" tittel="adresse.tittel" beskrivelse="adresse.beskrivelse" icon={adresseIkon} visAnkerlenke>
            <div className={adresseStyles.box}>
                {driftsmeldinger.pdl && (
                    <div style={{ padding: "1rem 0" }}>
                        <Alert role="status" variant="warning">
                            {driftsmeldinger.pdl}
                        </Alert>
                    </div>
                )}

                <Folkeregisteret
                    bostedsadresse={bostedsadresse}
                    deltBosted={deltBosted}
                    oppholdsadresse={oppholdsadresseFreg}
                    kontaktadresser={kontaktadresserFreg}
                />

                {(kontaktadressePdl ?? oppholdsadressePdl) && (
                    <AndreAdresser kontaktadresse={kontaktadressePdl} oppholdsadresse={oppholdsadressePdl} />
                )}
            </div>
        </Box>
    );
};

export default Adresser;
