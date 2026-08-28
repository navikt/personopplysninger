import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { basePath } from "@/constants";
import { useStore } from "@/store/Context";
import pcStyles from "../pagecontainer/PageContainer.module.css";

interface Props {
    to: string;
}

const Tilbake = (props: Props) => {
    const { to } = props;
    const [{ locale }] = useStore();

    return (
        <Link to={`${basePath}/${locale}${to}`} className="lenke">
            <ChevronLeftIcon className={pcStyles.backIcon} aria-hidden="true" />
            <FormattedMessage id="side.tilbake" />
        </Link>
    );
};

export default Tilbake;
