import Personalia from './1-personalia/Personalia';
import Adresser from './3-adresser/Adresser';
import DittNavKontor from './5-ditt-nav-kontor/DittNavKontor';
import KontaktInfo from './2-kontaktinfo/KontaktInfo';
import Utbetalinger from './4-utbetalinger/Utbetalinger';
import MedPersonInfo from 'store/providers/PersonInfo';
import personaliaIkon from 'assets/img/Personalia.svg';
import Box from 'components/box/Box';
import Spinner from 'components/spinner/Spinner';
import ErrorComponent, { HTTPError } from 'components/error/Error';

const Loader = () => (
    <Box id="personalia" tittel="personalia.tittel" beskrivelse="personalia.beskrivelse" icon={personaliaIkon}>
        <Spinner />
    </Box>
);

const PersonInfo = () => {
    return (
        <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
            {({ personalia, adresser, enhetKontaktInformasjon }) => (
                <>
                    {personalia && <Personalia personalia={personalia} />}
                    {personalia && <KontaktInfo tlfnr={personalia.tlfnr} />}
                    {adresser && <Adresser adresser={adresser} />}
                    {personalia && (
                        <Utbetalinger
                            kontonr={personalia.kontonr}
                            personident={personalia.personident}
                            utenlandskbank={personalia.utenlandskbank}
                            kontoregisterStatus={personalia.kontoregisterStatus}
                        />
                    )}
                    {adresser && enhetKontaktInformasjon && (
                        <DittNavKontor enhetKontaktInformasjon={enhetKontaktInformasjon} geografiskTilknytning={adresser.geografiskTilknytning} />
                    )}
                </>
            )}
        </MedPersonInfo>
    );
};

export const ErrorWithBox = (error: HTTPError) => (
    <Box id="personalia" tittel="personalia.tittel" beskrivelse="personalia.beskrivelse" icon={personaliaIkon}>
        <ErrorComponent error={error} />
    </Box>
);

export default PersonInfo;
