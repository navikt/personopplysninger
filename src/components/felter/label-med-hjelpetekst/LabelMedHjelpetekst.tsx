import { Fragment, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { CustomHelpText } from 'components/customHelpText/CustomHelpText';
import { Label } from '@navikt/ds-react';

interface Props {
    label: ReactNode;
    hjelpetekst?: string;
    labelId?: string;
    labelForId?: string;
}

export const LabelMedHjelpetekst = (props: Props) => {
    const { label, hjelpetekst, labelId, labelForId } = props;
    return (
        <div className="label-med-hjelpetekst">
            {label && (
                <Label htmlFor={labelForId} id={labelId}>
                    {props.label}
                </Label>
            )}
            {hjelpetekst && (
                <CustomHelpText placement={'right'}>
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
