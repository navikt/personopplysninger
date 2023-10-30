import Box from 'components/box/Box';
import kontaktIkon from 'assets/img/Kontakt.svg';
import TelefonnummerHosNav from './subsections/telefonnummer/TelefonnummerHosNav';
import DKIF from './subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch';
import { Tlfnr } from 'types/personalia';
import { FormattedMessage } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import Infotekst from 'components/infotekst/Infotekst';
interface Props {
    tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
    return (
        <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" beskrivelse="kontaktinformasjon-kilde" icon={kontaktIkon} visAnkerlenke={true}>
            {props.tlfnr && (props.tlfnr.telefonHoved || props.tlfnr.telefonAlternativ) ? (
                <>
                    <div className="underseksjon__header">
                        <Heading size={'small'} level={'3'}>
                            <FormattedMessage id="personalia.tlfnr.oveskrift" />
                        </Heading>
                    </div>

                    <div className="telefonnummer">
                        <TelefonnummerHosNav tlfnr={props.tlfnr} />
                    </div>
                    <div className="underseksjon__header underseksjon__divider dkif__overskrift-container">
                        <Heading size={'small'} level={'3'}>
                            <FormattedMessage id="personalia.dkif.overskrift" />
                        </Heading>
                        <Infotekst overskriftID="personalia.dkif.overskrift" beskrivelseID="personalia.dkif.beskrivelse" />
                    </div>
                    <div className="telefonnummer">
                        <DKIF />
                    </div>
                </>
            ) : (
                <>
                    <div className="telefonnummer">
                        <DKIF />
                    </div>
                    <div className="telefonnummer">
                        <TelefonnummerHosNav tlfnr={props.tlfnr} />
                    </div>
                </>
            )}
        </Box>
    );
};

export default KontaktInfo;
