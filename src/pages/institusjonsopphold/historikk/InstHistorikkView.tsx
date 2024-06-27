import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { useIntlFormatter } from 'hooks/useIntlFormatter';
import { InstInfo } from 'types/inst';
import Kilde from 'components/kilde/Kilde';
import { CustomHelpText } from 'components/customHelpText/CustomHelpText';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';

const InstHistorikkView = (props: { instInfo: InstInfo }) => {
    const [viewAmount, setViewAmount] = useState(20);
    const location = useLocation();
    const { formatMessage } = useIntlFormatter();
    const { instInfo } = props;

    let animateDelay = 0;
    let animateDelayKey = 0;
    let animateDelaySum = 0;

    return (
        <>
            <Alert variant="info">
                <FormattedMessage
                    id="inst.disclaimer"
                    values={{
                        lenkeTilInstMelding: (text) => <Link to={'https://www.nav.no/samarbeidspartner/opphold-institusjon'}>{text}</Link>,
                    }}
                />
            </Alert>
            <div className={'inst__tabell'}>
                {instInfo.length > 0 ? (
                    <>
                        <div className="historikk__flex-rad inst__head">
                            <div className="historikk__flex-kolonne">
                                <Label as="p">
                                    <FormattedMessage id="inst.periode" />
                                </Label>
                            </div>
                            <div className="historikk__flex-kolonne">
                                <Label as="p">
                                    <FormattedMessage id="inst.institusjon" />
                                </Label>
                            </div>
                        </div>
                        <TransitionGroup>
                            {instInfo
                                .sort((a, b) => (dayjs(a.startdato) > dayjs(b.startdato) ? -1 : 1))
                                .slice(0, viewAmount)
                                .map((innslag, i) => {
                                    if (animateDelayKey >= 20) {
                                        animateDelay = 0;
                                        animateDelayKey = 0;
                                        animateDelaySum = 0;
                                    }
                                    animateDelay = 50 + animateDelayKey * 15;
                                    animateDelaySum = +animateDelay;
                                    animateDelayKey++;

                                    const startdato = dayjs(innslag.startdato).format('DD.MM.YYYY');
                                    const faktiskSluttdato = innslag.faktiskSluttdato ? dayjs(innslag.faktiskSluttdato).format('DD.MM.YYYY') : '';

                                    return (
                                        <CSSTransition
                                            key={i}
                                            classNames={'inst__animate'}
                                            style={{
                                                transitionDelay: `${animateDelay}ms`,
                                                fontWeight: i >= 20 && i >= viewAmount - 20 ? 'bold' : 'normal',
                                            }}
                                            timeout={100 + animateDelaySum}
                                        >
                                            <div className="historikk__flex-rad">
                                                <div className="historikk__flex-kolonne historikk__heading">
                                                    <BodyShort>{`${startdato} - ${faktiskSluttdato}`}</BodyShort>
                                                    {innslag.fiktivSluttdato && (
                                                        <CustomHelpText title={formatMessage('inst.fiktivSluttdato.tittel')}>
                                                            <FormattedMessage id={'inst.fiktivSluttdato'} />
                                                        </CustomHelpText>
                                                    )}
                                                </div>
                                                <div className="historikk__flex-kolonne">
                                                    <Link to={`${location.pathname}/${innslag.registreringstidspunkt}`} className="lenke">
                                                        <BodyShort>{innslag.institusjonsnavn}</BodyShort>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    );
                                })}
                        </TransitionGroup>
                    </>
                ) : (
                    <div className="historikk__ingen-data">
                        <Alert variant="info">
                            <FormattedMessage id="inst.ingendata" />
                        </Alert>
                    </div>
                )}
                {instInfo.length > 20 && instInfo.length >= viewAmount && (
                    <div className={'inst__se-flere'}>
                        <Button
                            variant={'tertiary'}
                            onClick={() => setViewAmount(viewAmount + 20)}
                            icon={<ChevronDownIcon aria-hidden={true} />}
                            iconPosition="right"
                        >
                            Se flere
                        </Button>
                    </div>
                )}
            </div>
            <div className="inst__kilde">
                <Kilde kilde="inst.kilde" lenkeType="INGEN" />
            </div>
        </>
    );
};

export default InstHistorikkView;
