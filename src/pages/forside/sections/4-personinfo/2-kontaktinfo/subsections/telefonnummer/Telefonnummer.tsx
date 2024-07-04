import { useState } from 'react';
import { fetchPersonInfo, slettTlfnummer } from '@/clients/apiClient';
import { PersonInfo } from '@/types/personInfo';
import { useStore } from '@/store/Context';
import HttpFeilmelding, { Feilmelding } from '@/components/httpFeilmelding/HttpFeilmelding';
import { UNKNOWN } from '@/utils/text';
import Knapp from './Knapp';
import SlettModal from './SlettModal';
import TelefonnummerForm from './TelefonnummerForm';
import { BodyShort, Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { formatTelefonnummer } from '../../../../../../../utils/formattering';
import { PencilIcon, TrashIcon } from '@navikt/aksel-icons';

export interface OutboundTlfnummer {
    prioritet: 1 | 2;
    landskode?: string;
    nummer: string;
}

interface Props {
    prioritet: 1 | 2;
    titleId: string;
    hasTwoNumbers: boolean;
    onDeleteSuccess: () => void;
    onChangeSuccess: () => void;
    landskode?: string;
    tlfnummer: string;
}

const Telefonnummer = (props: Props) => {
    const { prioritet, titleId, landskode, tlfnummer, hasTwoNumbers } = props;
    const [visSlettModal, settVisSlettModal] = useState(false);
    const [slettLoading, settSlettLoading] = useState(false);
    const [endre, settEndre] = useState(false);
    const [alert, settAlert] = useState<Feilmelding | undefined>();
    const [, dispatch] = useStore();

    const defaultValues = {
        tlfnummer: tlfnummer || '',
        landskode: {
            label: UNKNOWN,
            value: landskode || '',
        },
    };

    const apneSlettModal = () => {
        settVisSlettModal(true);
    };
    const lukkSlettModal = () => {
        settVisSlettModal(false);
    };

    const onChangeSuccess = () => {
        props.onChangeSuccess();
        settEndre(false);
    };

    const onDeleteSuccess = () => {
        props.onDeleteSuccess();
        settSlettLoading(false);
        settVisSlettModal(false);
    };

    const getUpdatedData = () =>
        fetchPersonInfo().then((personInfo) => {
            dispatch({
                type: 'SETT_PERSON_INFO_RESULT',
                payload: personInfo as PersonInfo,
            });
        });

    const submitSlett = () => {
        if (!tlfnummer) {
            return;
        }

        const outbound = {
            prioritet,
            landskode: landskode,
            nummer: tlfnummer,
        };

        settSlettLoading(true);
        slettTlfnummer(outbound)
            .then(getUpdatedData)
            .then(onDeleteSuccess)
            .catch((error: Feilmelding) => {
                settSlettLoading(false);
                settAlert(error);
            });
    };

    return (
        <div className={'tlfnummer__rad'}>
            <div className={'tlfnummer__container'}>
                <div className={'tlfnummer__verdi'}>
                    <Label as="p">
                        <FormattedMessage id={titleId} values={{ x: hasTwoNumbers ? prioritet : '' }} />
                    </Label>
                    {!endre && (
                        <BodyShort>
                            {landskode && <span>{landskode} </span>}
                            {formatTelefonnummer(prioritet, tlfnummer, landskode)}
                        </BodyShort>
                    )}
                </div>

                {!endre && (
                    <div className={'tlfnummer__knapper'}>
                        <Knapp ariaLabel={'Endre telefonnummer'} onClick={() => settEndre(!endre)} ikon={PencilIcon} tekstId={'side.endre'} />
                        <Knapp ariaLabel={'Slett telefonnummer'} onClick={apneSlettModal} ikon={TrashIcon} tekstId={'side.slett'} />
                    </div>
                )}
            </div>
            {visSlettModal && (
                <SlettModal
                    visSlettModal={visSlettModal}
                    lukkSlettModal={lukkSlettModal}
                    submitSlett={submitSlett}
                    isLoading={slettLoading}
                    alert={alert}
                />
            )}
            {endre && (
                <TelefonnummerForm
                    type={'endre'}
                    prioritet={prioritet}
                    onCancelClick={() => settEndre(!endre)}
                    onChangeSuccess={onChangeSuccess}
                    defaultValues={defaultValues}
                />
            )}
            {alert && <HttpFeilmelding {...alert} />}
        </div>
    );
};

export default Telefonnummer;
