import { BodyLong, GuidePanel, Heading, Link } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import veilederIkon from "@/assets/img/Veileder.svg";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { useStore } from "@/store/Context";
import { formatName } from "@/utils/text";
import Spinner from "../4-personinfo/PersonInfo";
import styles from "./Header.module.css";

const Header = () => {
    const [{ authInfo }] = useStore();

    switch (authInfo.status) {
        default:
        case "LOADING": {
            return <Spinner />;
        }
        case "RESULT": {
            const { name } = authInfo.data;
            const fornavn = name;
            const Veileder = <img src={veilederIkon} className={styles.ikon} alt="" aria-hidden="true" />;

            return (
                <div className={styles.header}>
                    <GuidePanel illustration={Veileder} poster={true}>
                        <div className={`box__container ${styles.content}`}>
                            <Heading size={"medium"} level={"2"}>
                                {fornavn ? (
                                    <FormattedMessage id="header.hello.name" values={{ name: formatName(fornavn) }} />
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
                                                <Link href="/personvern" target="blank" rel="noopener noreferrer" className={styles.link}>
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
