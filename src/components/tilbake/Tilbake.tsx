import { Link } from 'react-router-dom';
import { basePath } from 'App';
import { FormattedMessage } from 'react-intl';
import { useStore } from '../../store/Context';
import { Back } from '@navikt/ds-icons';

interface Props {
    to: string;
}

const Tilbake = (props: Props) => {
    const { to } = props;
    const [{ locale }] = useStore();

    return (
        <Link to={`${basePath}/${locale}${to}`} className="lenke">
            <Back />
            <FormattedMessage id="side.tilbake" />
        </Link>
    );
};

export default Tilbake;
