import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { FormattedMessage } from "react-intl";
import { basePath } from "@/constants";
import { useStore } from "@/store/Context";

interface Props {
    to: string;
}

const Tilbake = (props: Props) => {
    const { to } = props;
    const [{ locale }] = useStore();

    return (
        <a href={`${basePath}/${locale}${to}`} className="lenke">
            <ChevronLeftIcon className="da__back-icon" aria-hidden="true" />
            <FormattedMessage id="side.tilbake" />
        </a>
    );
};

export default Tilbake;
