import { useFormContext } from 'react-hook-form';
import { FormFields } from '../../types';
import { useIntlFormatter } from '../../../../../../../../hooks/useIntlFormatter';
import { validerBankkode } from '../../utils';
import {
    hasMultipleCombinedSpaces,
    isBlacklistedCommon,
    isFirstCharNotSpace,
    isOnlyNonLetters,
    isOnlySignsSpace,
    isValidAdresselinje,
} from '../../../../../../../../utils/validators';
import { Label, TextField } from '@navikt/ds-react';

const AdresseFields = () => {
    const { formatMessage } = useIntlFormatter();

    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    const shouldValidateAdresse = () => validerBankkode(watch().land, watch().bickode, watch().bankkode) || !!watch().adresse2 || !!watch().adresse3;

    const validateIfSet = (value: string, validationResult: boolean, messageId: string) =>
        value ? validationResult || formatMessage(messageId) : true;

    const requiredOnCondition = (value: string, condition: boolean, messageId: string) => (condition ? !!value || formatMessage(messageId) : true);

    const adressePakrevd = 'validation.adresse.pakrevd';
    const adresselinjePakrevd = 'validation.adresselinje.pakrevd';
    const firstCharNotSpace = 'validation.firstchar.notspace';
    const svartelisteFelles = 'validation.svarteliste.felles';
    const multipleSpaces = 'validation.multiple.spaces';
    const onlySpaceSignsDigits = 'validation.only.space.signs.or.digits';
    const onlySpaceSigns = 'validation.only.space.or.signs';
    const adresselinjeUgyldig = 'validation.adresselinje.ugyldig';

    const baseAdresseValidation = {
        firstCharNotSpace: (v: string) => validateIfSet(v, isFirstCharNotSpace(v), firstCharNotSpace),
        notBlacklisted: (v: string) => validateIfSet(v, !isBlacklistedCommon(v), svartelisteFelles),
        noCombinedSpaces: (v: string) => validateIfSet(v, !hasMultipleCombinedSpaces(v), multipleSpaces),
        validAdresselinje: (v: string) => validateIfSet(v, isValidAdresselinje(v), adresselinjeUgyldig),
    };

    return (
        <>
            <div className="AdresseFields__header">
                <Label>{formatMessage('felter.bankens.adresse.label')}</Label>
            </div>

            <div className="skjemaelement">
                <TextField
                    {...register('adresse1', {
                        validate: {
                            required: (v) => requiredOnCondition(v, shouldValidateAdresse(), adressePakrevd),
                            notOnlyNonLetters: (v) => validateIfSet(v, !isOnlyNonLetters(v), onlySpaceSignsDigits),
                            ...baseAdresseValidation,
                        },
                    })}
                    id={'adresse1'}
                    label={'Adresselinje 1'}
                    autoComplete="address-line1"
                    hideLabel={true}
                    size="medium"
                    maxLength={34}
                    error={errors?.adresse1?.message}
                />
            </div>

            <div className="skjemaelement">
                <TextField
                    {...register('adresse2', {
                        onChange: () => isSubmitted && trigger(['adresse1', 'adresse3']),
                        validate: {
                            required: (v) => requiredOnCondition(v, !!watch().adresse3, adresselinjePakrevd),
                            notOnlyNonAlphanumeric: (v) => validateIfSet(v, !isOnlySignsSpace(v), onlySpaceSigns),
                            ...baseAdresseValidation,
                        },
                    })}
                    id={'adresse2'}
                    label={'Adresselinje 2'}
                    autoComplete="address-line2"
                    hideLabel={true}
                    size="medium"
                    maxLength={34}
                    error={errors?.adresse2?.message}
                />
            </div>

            <div className="skjemaelement">
                <TextField
                    {...register('adresse3', {
                        onChange: () => isSubmitted && trigger(['adresse1', 'adresse2']),
                        validate: {
                            notOnlyNonAlphanumeric: (v) => validateIfSet(v, !isOnlySignsSpace(v), onlySpaceSigns),
                            ...baseAdresseValidation,
                        },
                    })}
                    id={'adresse3'}
                    label={'Adresselinje 3'}
                    autoComplete="address-line3"
                    hideLabel={true}
                    size="medium"
                    maxLength={34}
                    error={errors?.adresse3?.message}
                />
            </div>
        </>
    );
};

export default AdresseFields;
