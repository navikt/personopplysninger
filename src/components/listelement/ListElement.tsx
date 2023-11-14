import { FormattedMessage } from 'react-intl';
import { useIntlFormatter } from '../../hooks/useIntlFormatter';
import { CustomHelpText } from 'components/customHelpText/CustomHelpText';
import { Label } from '@navikt/ds-react';

interface Props {
    title?: string;
    titleId?: string;
    hjelpetekstId?: string;
    content?: string | JSX.Element | null;
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

const ListElement = (props: Props) => {
    const { content, title, titleId, hjelpetekstId, children, className } = props;
    const { formatMessage } = useIntlFormatter();
    const helpTextTitle = title || (titleId && formatMessage(titleId)) || '';
    return content ? (
        <div className="list-item">
            <dt className="list-element-heading">
                <Label as="span">{titleId ? <FormattedMessage id={titleId} /> : title}</Label>
                {hjelpetekstId && (
                    <CustomHelpText title={helpTextTitle}>
                        <FormattedMessage id={hjelpetekstId} />
                    </CustomHelpText>
                )}
            </dt>
            <dd className={className}>{content}</dd>
            {children && <dd>{children}</dd>}
        </div>
    ) : null;
};

export default ListElement;
