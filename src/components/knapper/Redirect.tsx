import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { type NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import naturIkon from "@/assets/img/Natur.svg";
import veilederIkon from "@/assets/img/VeilederGul.svg";
import { redirects, validateAndDecodeRedirectUrl } from "@/utils/redirects";
import styles from "./Redirect.module.css";

interface Props {
    tjeneste?: string;
    encodedUrl?: string;
}

const RedirectKnapp = ({ encodedUrl, tjeneste }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!tjeneste || !encodedUrl) {
        return null;
    }

    const redirectUrl = validateAndDecodeRedirectUrl(encodedUrl);
    // If the redirect-url is not a valid nav.no url, redirect to the app front page
    if (!redirectUrl) {
        const basePath = location.pathname.split("sendt-fra")[0];
        const navigateOptions: NavigateOptions = { replace: true };
        navigate(basePath, navigateOptions);
        return null;
    }

    const redirect = redirects[tjeneste];

    return (
        <div className={styles.container}>
            <div className={styles.wrapperInner} style={{ backgroundImage: `url(${naturIkon})` }}>
                <span className={styles.ikonContainer}>
                    <img src={veilederIkon} className={styles.ikon} alt="Veileder" />
                </span>
                <div className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: redirect.beskrivelse }} />
                    <div className={styles.lenke}>
                        <div className={styles.chevron}>
                            <ArrowLeftIcon aria-hidden="true" />
                        </div>
                        <a href={redirectUrl}>{redirect.knapp}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedirectKnapp;
