import { LinkIcon } from "@navikt/aksel-icons";
import { Link } from "@navikt/ds-react";
import { useIntlFormatter } from "@/hooks/useIntlFormatter";
import styles from "./AnchorLink.module.css";

type Props = {
    id: string;
};

export const AnchorLink = ({ id }: Props) => {
    const { formatMessage } = useIntlFormatter();
    return (
        <Link href={`#${id}`} className={styles.anchorLink}>
            <LinkIcon className={styles.icon} aria-hidden="true" />
            {formatMessage("anker.lenkehit")}
        </Link>
    );
};
