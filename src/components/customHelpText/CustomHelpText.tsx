import { QuestionmarkIcon } from "@navikt/aksel-icons";
import { Button, type HelpTextProps, Popover } from "@navikt/ds-react";
import { useRef, useState } from "react";
import type { Language } from "@/language/language";
import { text } from "@/language/text";
import styles from "./CustomHelpText.module.css";

type CustomHelpTextProps = {
    title: string;
    children: React.ReactNode;
    placement?: HelpTextProps["placement"];
    language: Language;
};

export const CustomHelpText = ({ title, children, placement = "top", language }: CustomHelpTextProps) => {
    const inputRef = useRef(null);
    const [openState, setOpenState] = useState<boolean>(false);

    return (
        <div>
            <Button
                type="button"
                variant="tertiary"
                className={styles.helpButton}
                onClick={() => setOpenState(!openState)}
                ref={inputRef}
                aria-label={`${text.merOm[language]} ${title}`}
                aria-expanded={openState}
            >
                <QuestionmarkIcon className={styles.icon} aria-hidden="true" />
            </Button>
            <Popover
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={inputRef.current}
                placement={placement}
                className={styles.popover}
            >
                <Popover.Content>{children}</Popover.Content>
            </Popover>
        </div>
    );
};
