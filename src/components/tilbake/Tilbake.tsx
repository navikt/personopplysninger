import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { FormattedMessage } from "react-intl";
import { basePath } from "@/constants";
import { useStore } from "@/store/Context";
import styles from "./Tilbake.module.css";

interface Props {
    to: string;
}

const Tilbake = (props: Props) => {
    const { to } = props;
    const [{ locale }] = useStore();

    return (
        <Link to={`${basePath}/${locale}${to}`} className={styles.link}>
            <ChevronLeftIcon className={styles.icon} aria-hidden="true" />
            <FormattedMessage id="side.tilbake" />
        </a>
    );
};

export default Tilbake;
