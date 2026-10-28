import { BodyLong, GuidePanel, Heading, Link } from "@navikt/ds-react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import veilederIkon from "@/assets/img/Veileder.svg";
import { fetchInnloggingsStatus } from "@/clients/apiClient";
import boxStyles from "@/components/box/Box.module.css";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useStore } from "@/store/Context";
import { getAssetUrl } from "@/utils/assets";
import { formatName } from "@/utils/text";
import styles from "./Header.module.css";

const Header = () => {
    const [{ authInfo }, dispatch] = useStore();
    const manglerNavn = authInfo.status === "RESULT" && !authInfo.data.name;

    useEffect(() => {
        if (!manglerNavn) {
            return;
        }
        fetchInnloggingsStatus()
            .then((auth) => dispatch({ type: "SETT_AUTH_RESULT", payload: auth }))
            .catch(() => undefined);
    }, [manglerNavn, dispatch]);

    switch (authInfo.status) {
        default:
        case "LOADING": {
            return <Spinner />;
        }
        case "RESULT": {
            const { name } = authInfo.data;
            const Veileder = <img src={getAssetUrl(veilederIkon)} className={styles.ikon} alt="" />;

            return (
                <div className={styles.header}>
                    <GuidePanel illustration={Veileder} poster={true}>
                        <div className={`${boxStyles.container} ${styles.content}`}>
                            <Heading size={"medium"} level={"2"}>
                                {name ? (
                                    <FormattedMessage id="header.hello.name" values={{ name: formatName(name) }} />
                                ) : (
                                    <FormattedMessage id="header.hello" />
                                )}
                            </Heading>
                            <div className={styles.seksjon}>
                                <BodyLong>
                                    <FormattedMessage id="header.obs" />
                                </BodyLong>
                            </div>
                            <div className={styles.seksjon}>
                                <BodyLong>
                                    <FormattedMessage
                                        id="header.description"
                                        values={{
                                            a: (text) => (
                                                <Link href="/personvern" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                                    {text}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </div>
                        </div>
                    </GuidePanel>
                </div>
            );
        }
        case "ERROR": {
            return <ErrorMessage error={authInfo.error} />;
        }
    }
};
export default Header;
