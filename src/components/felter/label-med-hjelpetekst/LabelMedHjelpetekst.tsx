import { Label } from "@navikt/ds-react";
import type { ReactNode } from "react";
import { CustomHelpText } from "@/components/customHelpText/CustomHelpText";
import type { Language } from "@/language/language";
import styles from "./LabelMedHjelpetekst.module.css";

interface Props {
    label: string;
    hjelpetekst?: ReactNode;
    labelId?: string;
    labelForId?: string;
    language: Language;
}

export const LabelMedHjelpetekst = (props: Props) => {
    const { label, hjelpetekst, labelId, labelForId, language } = props;
    return (
        <div className={styles.labelMedHjelpetekst}>
            {labelId && (
                <Label htmlFor={labelForId} id={labelId}>
                    {label}
                </Label>
            )}
            {!labelId && <span>{label}</span>}
            {hjelpetekst && (
                <CustomHelpText title={label} placement={"right"} language={language}>
                    {hjelpetekst}
                </CustomHelpText>
            )}
        </div>
    );
};
