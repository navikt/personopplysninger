import { useRef, useState } from 'react';
import { useIntlFormatter } from 'hooks/useIntlFormatter';
import { Button, HelpTextProps, Popover } from '@navikt/ds-react';
import { QuestionmarkIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

type CustomHelpTextProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
    placement?: HelpTextProps['placement'];
};

export const CustomHelpText = ({ title, children, className, placement = 'top' }: CustomHelpTextProps) => {
    const inputRef = useRef(null);
    const [openState, setOpenState] = useState<boolean>(false);
    const { formatMessage } = useIntlFormatter();

    return (
        <div className={classNames('customHelpText', className)}>
            <Button
                variant="tertiary"
                onClick={() => setOpenState(true)}
                ref={inputRef}
                className={'customHelpText__help-button'}
                aria-label={`${formatMessage('felter.merom')} ${title}`}
            >
                <QuestionmarkIcon className={'customHelpText__icon'} aria-hidden="true" />
            </Button>
            <Popover
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={inputRef.current}
                placement={placement}
                className="customHelpText__popover"
            >
                <Popover.Content>{children}</Popover.Content>
            </Popover>
        </div>
    );
};
