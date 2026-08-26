import { Alert } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import type { OptionType } from "@/types/option";
import { kreverBicOgBankkode } from "../utils";
import AdresseFields from "./felter/AdresseFields";
import BankkodeField from "./felter/BankkodeField";
import BickodeField from "./felter/BickodeField";

interface Props {
    valgtLand: OptionType;
}

const LandMedBankkode = (props: Props) => {
    const { valgtLand } = props;

    return (
        <>
            <div className="utbetalinger__bic-bankkode">
                {!kreverBicOgBankkode(valgtLand) && (
                    <Alert role="status" variant="warning">
                        <FormattedMessage
                            id="felter.landetbrukerbankkode.advarsel"
                            values={{
                                land: valgtLand.label.toLowerCase(),
                                span: (text) => <span className="capitalize">{text}</span>,
                            }}
                        />
                    </Alert>
                )}
                <BickodeField />
                <BankkodeField />
            </div>
            <AdresseFields />
        </>
    );
};
export default LandMedBankkode;
