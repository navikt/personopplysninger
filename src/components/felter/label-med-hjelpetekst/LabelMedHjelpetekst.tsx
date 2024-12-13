import { Fragment } from 'react';
import { Label } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { CustomHelpText } from '@/components/customHelpText/CustomHelpText';

interface Props {
    label: string;
    hjelpetekst?: string;
    labelId?: string; //If labelId is defined, the component provides a label-tag
    labelForId?: string;
}

export const LabelMedHjelpetekst = (props: Props) => {
    const { label, hjelpetekst, labelId, labelForId } = props;
    return (
        <div className="label-med-hjelpetekst">
            {labelId && (
                <Label htmlFor={labelForId} id={labelId}>
                    {label}
                </Label>
            )}
            {!labelId && <span>{label}</span>}
            {hjelpetekst && (
                <CustomHelpText title={label} placement={'right'}>
                    <FormattedMessage
                        id={hjelpetekst}
                        values={{
                            b: (text) => <b>{text}</b>,
                            p: (...chunks) => (
                                <p>
                                    {chunks.map((chunk, index) => (
                                        <Fragment key={index}>{chunk}</Fragment>
                                    ))}
                                </p>
                            ),
                        }}
                    />
                </CustomHelpText>
            )}
        </div>
    );
};
