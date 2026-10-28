import { Alert, BodyLong } from "@navikt/ds-react";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
import styles from "./EndreKontonummerResult.module.css";

export const EndreKontonummerResult = () => {
    const result = Cookies.get("kontonr-result");
    if (!result) {
        return null;
    }

    Cookies.remove("kontonr-result", { path: "/", domain: ".nav.no" });

    if (result !== "success" && result !== "error") {
        return null;
    }

    return (
        <Alert variant={result} className={styles.endreKontonrResult}>
            <FormattedMessage
                id={`endreKontonummer.${result}`}
                values={{
                    p: (text) => <BodyLong>{text}</BodyLong>,
                }}
            />
        </Alert>
    );
};
