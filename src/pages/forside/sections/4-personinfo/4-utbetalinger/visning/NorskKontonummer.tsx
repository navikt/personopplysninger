import ListElement from '@/components/listelement/ListElement';
import { formatterKontonr } from '../utils';
import { Liste } from '../../../../../../components/listelement/Liste';

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
