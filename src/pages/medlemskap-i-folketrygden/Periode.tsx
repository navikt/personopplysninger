import { FormattedMessage } from 'react-intl';
import { BodyLong } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { CalendarIcon } from '@navikt/aksel-icons';
import { Liste } from '@/components/listelement/Liste';
import { MedlInnslag } from '@/types/medl';
import ListElement from '@/components/listelement/ListElement';

interface Props {
    periode: MedlInnslag;
}

const Periode = (props: Props) => {
    const { periode } = props;
    return (
        <div className="medl__flex-rad">
            <div className="medl__flex-kolonne">
                <div className={'medl__heading'}>
                    <CalendarIcon className="medl__kalender" aria-hidden="true" />
                    <BodyLong>
                        <FormattedMessage id={'medl.periode'} /> {dayjs(periode.fraOgMed).format('DD.MM.YY')}
                        {' - '}
                        {dayjs(periode.tilOgMed).format('DD.MM.YY')}
                    </BodyLong>
                </div>
                <div className={'medl__flex-grid box__content'}>
                    <Liste>
                        <ListElement titleId="medl.hjemmel" content={periode.hjemmel} hjelpetekstId={'medl.hjemmel.hjelpetekst'} />
                        <ListElement titleId="medl.trygdedekning" content={periode.trygdedekning} hjelpetekstId={'medl.trygdedekning.hjelpetekst'} />
                        <ListElement
                            className={'medl__land'}
                            titleId="medl.lovvalgsland"
                            content={periode.lovvalgsland}
                            hjelpetekstId={'medl.lovvalgsland.hjelpetekst'}
                        />
                        <ListElement className={'medl__land'} titleId="medl.statsborgerland" content={periode.studieinformasjon?.statsborgerland} />
                        <ListElement className={'medl__land'} titleId="medl.studieland" content={periode.studieinformasjon?.studieland} />
                    </Liste>
                </div>
            </div>
        </div>
    );
};

export default Periode;
