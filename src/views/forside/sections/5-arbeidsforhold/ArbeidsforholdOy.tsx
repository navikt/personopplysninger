import type { AFListeOnClick } from "@navikt/arbeidsforhold";
import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import { basePath } from "@/constants";
import type { Locale } from "@/store/Store";

const ArbeidsforholdListe = lazy(() => import("./ArbeidsforholdListe"));

interface Props {
    locale: Locale;
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    printName: string;
    printSSN: string;
}

const ArbeidsforholdOy = ({ locale, miljo, customApiUrl, printName, printSSN }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onClick: AFListeOnClick = { type: "LENKE", href: `${basePath}/${locale}/arbeidsforhold/{id}` };

    if (!mounted) {
        return <Spinner />;
    }

    return (
        <Suspense fallback={<Spinner />}>
            <ArbeidsforholdListe
                miljo={miljo}
                customApiUrl={customApiUrl}
                locale={locale}
                onClick={onClick}
                printName={printName}
                printSSN={printSSN}
            />
        </Suspense>
    );
};

export default ArbeidsforholdOy;
