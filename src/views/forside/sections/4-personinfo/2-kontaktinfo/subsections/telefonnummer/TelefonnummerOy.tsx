import Oy from "@/components/astro/Oy";
import type { RuntimeConfig } from "@/config/runtimeConfig";
import type { Locale } from "@/store/Store";
import type { Personalia } from "@/types/personalia";
import Telefonliste from "./Telefonliste";

interface Props {
    locale: Locale;
    config: RuntimeConfig;
    personalia: Personalia;
}

const TelefonnummerOy = ({ locale, config, personalia }: Props) => (
    <Oy locale={locale} config={config} personInfo={{ personalia }}>
        <Telefonliste />
    </Oy>
);

export default TelefonnummerOy;
