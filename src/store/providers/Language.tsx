import { IntlProvider } from 'react-intl';
import nbMessages from '@/text/nb';
import enMessages from '@/text/en';
import nnMessages from '@/text/nn';
import { useStore } from '@/store/Context';

const languages = {
    nb: nbMessages,
    en: enMessages,
    nn: nnMessages,
};

interface Props {
    children: JSX.Element;
}

const Languages = (props: Props) => {
    const [{ locale }] = useStore();

    return (
        <IntlProvider locale={locale} messages={languages[locale]}>
            {props.children}
        </IntlProvider>
    );
};

export default Languages;
