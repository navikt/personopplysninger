import Oy from "@/components/astro/Oy";
import type { RuntimeConfig } from "@/config/runtimeConfig";
import type { Locale } from "@/store/Store";
import type { Adresser } from "@/types/adresser";
import AndreAdresserVisning from "./AndreAdresserVisning";

interface Props {
    locale: Locale;
    config: RuntimeConfig;
    adresser: Adresser;
}

const AndreAdresserOy = ({ locale, config, adresser }: Props) => (
    <Oy locale={locale} config={config} personInfo={{ adresser }}>
        <AndreAdresserVisning />
    </Oy>
);

export default AndreAdresserOy;
