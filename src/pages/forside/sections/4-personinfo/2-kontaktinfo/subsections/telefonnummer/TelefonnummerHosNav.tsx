import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Tlfnr } from 'types/personalia';
import Kilde from 'components/kilde/Kilde';
import Telefonnummer from './Telefonnummer';
import TelefonnummerForm from './TelefonnummerForm';
import { fjernMellorom } from 'utils/formattering';
import driftsmeldinger from 'driftsmeldinger';
import { Alert, Button, Label } from '@navikt/ds-react';
import { PlusCircleIcon } from '@navikt/aksel-icons';

interface Props {
    tlfnr?: Tlfnr;
}

const TelefonnummerHosNav = (props: Props) => {
    const [opprett, settOpprett] = useState<boolean>();
    const { tlfnr } = props;

    const onChangeSuccess = () => {
        settOpprett(false);
    };

    const onDeleteSuccess = () => {
        settOpprett(false);
    };

    const onLeggTil = () => settOpprett(!opprett);

    return (
        <>
            {driftsmeldinger.pdl && (
                <div style={{ paddingBottom: '1rem' }}>
                    <Alert role="status" variant="warning">
                        {driftsmeldinger.pdl}
                    </Alert>
                </div>
            )}
            {tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ) ? (
                <div>
                    {tlfnr.telefonHoved && (
                        <Telefonnummer
                            prioritet={1}
                            titleId="personalia.tlfnr.telefon"
                            hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
                            landskode={tlfnr.landskodeHoved}
                            tlfnummer={fjernMellorom(tlfnr.telefonHoved)}
                            onDeleteSuccess={onDeleteSuccess}
                            onChangeSuccess={onChangeSuccess}
                        />
                    )}
                    {tlfnr.telefonAlternativ && (
                        <Telefonnummer
                            prioritet={2}
                            titleId="personalia.tlfnr.telefon"
                            hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
                            landskode={tlfnr.landskodeAlternativ}
                            tlfnummer={fjernMellorom(tlfnr.telefonAlternativ)}
                            onDeleteSuccess={onDeleteSuccess}
                            onChangeSuccess={onChangeSuccess}
                        />
                    )}
                    {
                        <div className="margin-kilde">
                            <Kilde kilde="personalia.source.nav" lenkeType={'INGEN'} />
                        </div>
                    }
                </div>
            ) : (
                <div className="underseksjon__beskrivelse">
                    <FormattedMessage
                        id="personalia.tlfnr.ingenData"
                        values={{
                            b: (text) => <b>{text}</b>,
                            br: (text) => (
                                <>
                                    <br />
                                    {text}
                                </>
                            ),
                        }}
                    />
                </div>
            )}

            {!opprett && !(tlfnr && tlfnr.telefonHoved && tlfnr.telefonAlternativ) && (
                <Button
                    icon={<PlusCircleIcon className={'kilde__icon'} aria-hidden="true" />}
                    variant="tertiary"
                    onClick={onLeggTil}
                    className="tlfnummer__leggtil knapp-med-ikon lenke"
                    aria-label="Legg til telefonnummer i NAV sitt register"
                >
                    <FormattedMessage id={'side.leggtil.kontaktinformasjon'} />
                </Button>
            )}

            {opprett && (
                <div className={'tlfnummer__rad-leggtil'}>
                    <div className={'tlfnummer__container'}>
                        <Label className="tlfnummer__verdi" as="p">
                            <FormattedMessage id="side.leggtil.kontaktinformasjon" />
                        </Label>
                    </div>
                    <TelefonnummerForm
                        type={'opprett'}
                        prioritet={tlfnr && tlfnr.telefonHoved ? 2 : 1}
                        onCancelClick={() => settOpprett(false)}
                        onChangeSuccess={onChangeSuccess}
                        tlfnr={tlfnr}
                        defaultValues={{
                            landskode: {
                                label: 'Norge',
                                value: '+47',
                            },
                            tlfnummer: '',
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default TelefonnummerHosNav;
