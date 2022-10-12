import { useState, useRef } from "react";
import { Button, Popover, HelpTextProps } from "@navikt/ds-react";
import { Helptext, HelptextFilled } from "@navikt/ds-icons";
import classNames from "classnames";

type CustomHelpTextProps = {
  children: React.ReactNode;
  className?: string;
  placement?: HelpTextProps["placement"];
};

export const CustomHelpText = ({
  children,
  className,
  placement = "top",
}: CustomHelpTextProps) => {
  const inputRef = useRef(null);
  const [openState, setOpenState] = useState<boolean>(false);
  return (
    <div className={classNames("customHelpText", className)}>
      <Button
        type={"button"}
        variant={"tertiary"}
        onClick={() => setOpenState(true)}
        ref={inputRef}
        className={"customHelpText__help-button"}
      >
        <Helptext className={"customHelpText__icon"} />
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
