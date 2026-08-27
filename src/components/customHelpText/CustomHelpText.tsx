import { QuestionmarkIcon } from "@navikt/aksel-icons";
import { Button, type HelpTextProps, Popover } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useIntlFormatter } from "@/hooks/useIntlFormatter";
import styles from "./CustomHelpText.module.css";

type CustomHelpTextProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
    placement?: HelpTextProps["placement"];
};

export const CustomHelpText = ({ title, children, className, placement = "top" }: CustomHelpTextProps) => {
    const inputRef = useRef(null);
    const [openState, setOpenState] = useState<boolean>(false);
    const { formatMessage } = useIntlFormatter();

    return (
        <div className={className}>
            <Button
                type="button"
                variant="tertiary"
                className={styles.helpButton}
                onClick={() => setOpenState(!openState)}
                ref={inputRef}
                aria-label={`${formatMessage("felter.merom")} ${title}`}
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
