import { Link } from 'react-router-dom';
import { basePath } from 'App';
import { FormattedMessage } from 'react-intl';
import { useStore } from '../../store/Context';
import { ChevronLeftIcon } from '@navikt/aksel-icons';

interface Props {
    to: string;
}

const Tilbake = (props: Props) => {
    const { to } = props;
    const [{ locale }] = useStore();

    return (
        <Link to={`${basePath}/${locale}${to}`} className="lenke">
            <ChevronLeftIcon className="da__back-icon" />
            <FormattedMessage id="side.tilbake" />
        </Link>
    );
};

export default Tilbake;
