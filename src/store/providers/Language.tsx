import { IntlProvider } from "react-intl";
import { useStore } from "@/store/Context";
import enMessages from "@/text/en";
import nbMessages from "@/text/nb";
import nnMessages from "@/text/nn";

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
