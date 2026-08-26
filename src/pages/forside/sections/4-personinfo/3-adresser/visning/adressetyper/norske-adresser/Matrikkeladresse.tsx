import { BodyShort } from "@navikt/ds-react";
import type { Matrikkeladresse as MatrikkeladresseType } from "@/types/adresser/adresse";
import Postnummer from "../../../komponenter/Postnummer";

const Matrikkeladresse = (props: MatrikkeladresseType) => {
    const { tilleggsnavn, postnummer } = props;
    const { poststed, coAdressenavn } = props;
    return (
        <>
            {coAdressenavn && (
                <div className="adresse__linje">
                    <BodyShort>{coAdressenavn}</BodyShort>
                </div>
            )}
            {tilleggsnavn && (
                <div className="adresse__linje">
                    <BodyShort>{tilleggsnavn}</BodyShort>
                </div>
            )}
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default Matrikkeladresse;
