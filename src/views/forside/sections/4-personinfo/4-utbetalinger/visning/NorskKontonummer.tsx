import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import { formatterKontonr } from "../utils";

interface Props {
    kontonummer?: string;
}

const NorskKontonummer = ({ kontonummer }: Props) => {
    return kontonummer ? (
        <Liste>
            <ListElement titleId="personalia.kontonr" content={formatterKontonr(kontonummer)} />
        </Liste>
    ) : null;
};

export default NorskKontonummer;
