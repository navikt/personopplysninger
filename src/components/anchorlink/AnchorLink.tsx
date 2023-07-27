import { LinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { useIntlFormatter } from 'hooks/useIntlFormatter';

type Props = {
    id: string;
};

export const AnchorLink = ({ id }: Props) => {
    const { formatMessage } = useIntlFormatter();
    return (
        <Link href={`#${id}`} className={'anchor-link'}>
            <LinkIcon className={'anchor-link__icon'} />
            {formatMessage('anker.lenkehit')}
        </Link>
    );
};
