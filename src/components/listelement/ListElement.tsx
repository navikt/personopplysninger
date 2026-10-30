import { Label } from "@navikt/ds-react";
import type { ReactNode } from "react";
import { CustomHelpText } from "@/components/customHelpText/CustomHelpText";
import type { Language } from "@/language/language";
import styles from "./ListElement.module.css";

interface Props {
    tittel: string;
    hjelpetekst?: ReactNode;
    content?: string | JSX.Element | null;
    children?: JSX.Element | JSX.Element[];
    className?: string;
    language: Language;
}

const ListElement = (props: Props) => {
    const { content, tittel, hjelpetekst, children, className, language } = props;
    return content ? (
        <div>
            <dt className={styles.listElementHeading}>
                <Label as="span">{tittel}</Label>
                {hjelpetekst && (
                    <CustomHelpText title={tittel} language={language}>
                        {hjelpetekst}
                    </CustomHelpText>
                )}
            </dt>
            <dd className={className}>{content}</dd>
            {children && <dd>{children}</dd>}
        </div>
    ) : null;
};

export default ListElement;
