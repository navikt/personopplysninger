import lenker from './LenkerData';
import LinkBox from './linkbox/LinkBox';
import DSOPIkon from 'assets/img/DSOP.svg';
import INSTIkon from 'assets/img/Institusjonsopphold.svg';
import MEDLIkon from 'assets/img/MEDL.svg';
import FullmaktIkon from 'assets/img/Fullmakt.svg';
import SkjermingIkon from 'assets/img/Skjerming.svg';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'store/Context';
import { basePath } from '../../../../App';
import { AnchorLink } from '../../../../components/anchorlink/AnchorLink';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';

const { REACT_APP_PDL_URL, REACT_APP_SKJERMING_URL } = process.env;

const id = 'flere-opplysninger';

const LinksContainer = () => {
    const [{ locale }] = useStore();
    return (
        <Panel className="el__panel" id={id}>
            <div className="el__content">
                <div className="el__overskrift">
                    <Heading size={'medium'} level={'2'}>
                        <FormattedMessage id="lenker.tittel" />
                    </Heading>
                </div>
                <AnchorLink id={id} />
                <div className="el__info">
                    <BodyLong>
                        <FormattedMessage id="lenker.beskrivelse" />
                    </BodyLong>
                </div>
                {lenker(locale).map((link) => (
                    <LinkBox
                        id={link.id}
                        key={link.id}
                        icon={link.icon}
                        tittel={link.tittel}
                        beskrivelse={link.beskrivelse}
                        lenkeTekst={link.lenkeTekst}
                        to={link.url}
                        component={'a'}
                    />
                ))}
                <LinkBox
                    id={'inst'}
                    icon={INSTIkon}
                    tittel={'lenker.inst.tittel'}
                    beskrivelse={'lenker.inst.beskrivelse'}
                    lenkeTekst={'lenker.inst.lenkeTekst'}
                    to={`${basePath}/${locale}/institusjonsopphold`}
                    component={'Link'}
                />
                <LinkBox
                    id={'dsop'}
                    icon={DSOPIkon}
                    tittel={'lenker.dsop.tittel'}
                    beskrivelse={'lenker.dsop.beskrivelse'}
                    lenkeTekst={'lenker.dsop.lenkeTekst'}
                    to={`${basePath}/${locale}/dsop`}
                    component={'Link'}
                />
                <LinkBox
                    id={'medl'}
                    icon={MEDLIkon}
                    tittel={'lenker.medl.tittel'}
                    beskrivelse={'lenker.medl.beskrivelse'}
                    lenkeTekst={'lenker.medl.lenkeTekst'}
                    to={`${basePath}/${locale}/medlemskap-i-folketrygden`}
                    component={'Link'}
                />
                <LinkBox
                    id={'fullmakt'}
                    icon={FullmaktIkon}
                    tittel={'lenker.fullmakt.tittel'}
                    beskrivelse={'lenker.fullmakt.beskrivelse'}
                    lenkeTekst={'lenker.fullmakt.lenkeTekst'}
                    to={`${REACT_APP_PDL_URL}`}
                    component={'a'}
                />
                <LinkBox
                    id={'skjerming'}
                    icon={SkjermingIkon}
                    tittel={'lenker.skjerming.tittel'}
                    beskrivelse={'lenker.skjerming.beskrivelse'}
                    lenkeTekst={'lenker.skjerming.lenkeTekst'}
                    to={`${REACT_APP_SKJERMING_URL}`}
                    component={'a'}
                />
            </div>
        </Panel>
    );
};

export default LinksContainer;
