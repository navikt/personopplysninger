import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { useEffect } from "react";
import naturIkon from "@/assets/img/Natur.svg";
import veilederIkon from "@/assets/img/VeilederGul.svg";
import { getAssetUrl } from "@/utils/assets";
import { redirects, validateAndDecodeRedirectUrl } from "@/utils/redirects";
import styles from "./Redirect.module.css";

interface Props {
    tjeneste?: string;
    encodedUrl?: string;
}

const RedirectKnapp = ({ encodedUrl, tjeneste }: Props) => {
    const redirectUrl = tjeneste && encodedUrl ? validateAndDecodeRedirectUrl(encodedUrl) : null;
    const redirect = tjeneste ? redirects[tjeneste] : undefined;
    const invalidRedirect = Boolean(tjeneste && encodedUrl && (!redirectUrl || !redirect));

    useEffect(() => {
        if (invalidRedirect) {
            const fallbackPath = window.location.pathname.split("sendt-fra")[0];
            window.location.replace(fallbackPath);
        }
    }, [invalidRedirect]);

    if (!redirectUrl || !redirect) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapperInner} style={{ backgroundImage: `url(${getAssetUrl(naturIkon)})` }}>
                <span className={styles.ikonContainer}>
                    <img src={getAssetUrl(veilederIkon)} className={styles.ikon} alt="Veileder" />
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
