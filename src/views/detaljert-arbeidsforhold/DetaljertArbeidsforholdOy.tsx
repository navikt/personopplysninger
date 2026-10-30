import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import type { Locale } from "@/store/Store";

const DetaljertArbeidsforholdClient = lazy(() => import("./DetaljertArbeidsforholdClient"));

interface Props {
    locale: Locale;
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    navArbeidsforholdId: number;
    printName: string;
    printSSN: string;
}

const DetaljertArbeidsforholdOy = ({ locale, miljo, customApiUrl, navArbeidsforholdId, printName, printSSN }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Spinner />;
    }

    return (
        <Suspense fallback={<Spinner />}>
            <DetaljertArbeidsforholdClient
                miljo={miljo}
                customApiUrl={customApiUrl}
                locale={locale}
                navArbeidsforholdId={navArbeidsforholdId}
                printName={printName}
                printSSN={printSSN}
            />
        </Suspense>
    );
};

export default DetaljertArbeidsforholdOy;
