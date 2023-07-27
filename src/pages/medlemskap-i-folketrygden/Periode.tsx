import { MedlInnslag } from 'types/medl';
import { FormattedMessage } from 'react-intl';
import ListElement from '../../components/listelement/ListElement';
import { BodyLong } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { CalendarIcon } from '@navikt/aksel-icons';

interface Props {
    periode: MedlInnslag;
}

const Periode = (props: Props) => {
    const { periode } = props;
    return (
        <div className="medl__flex-rad">
            <div className="medl__flex-kolonne">
                <div className={'medl__heading'}>
                    <CalendarIcon className="medl__kalender" />
                    <BodyLong>
                        <FormattedMessage id={'medl.periode'} /> {dayjs(periode.fraOgMed).format('DD.MM.YY')}
                        {' - '}
                        {dayjs(periode.tilOgMed).format('DD.MM.YY')}
                    </BodyLong>
                </div>
                <div className={'medl__flex-grid box__content'}>
                    <dl className="list">
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
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Periode;
