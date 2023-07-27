import { useRef, useState } from 'react';
import { Button, HelpTextProps, Popover } from '@navikt/ds-react';
import { QuestionmarkIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

type CustomHelpTextProps = {
    children: React.ReactNode;
    className?: string;
    placement?: HelpTextProps['placement'];
};

export const CustomHelpText = ({ children, className, placement = 'top' }: CustomHelpTextProps) => {
    const inputRef = useRef(null);
    const [openState, setOpenState] = useState<boolean>(false);
    return (
        <div className={classNames('customHelpText', className)}>
            <Button type={'button'} variant={'tertiary'} onClick={() => setOpenState(true)} ref={inputRef} className={'customHelpText__help-button'}>
                <QuestionmarkIcon className={'customHelpText__icon'} />
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
