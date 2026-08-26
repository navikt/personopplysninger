import { BodyShort, Loader } from "@navikt/ds-react";
import styles from "./Spinner.module.css";

type Props = {
    text?: string;
};

const Spinner = ({ text = "Laster innhold..." }: Props) => (
    <div className={styles.wrapper}>
        <BodyShort>{text}</BodyShort>
        <Loader size="large" />
    </div>
);

export default Spinner;
