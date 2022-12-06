import React from "react";

interface Props {
  backgroundImage?: string;
  backgroundColor?: string;
  ariaHidden?: boolean;
}
const Icon = (props: Props) => {
  return (
    <div
      className="icon__circle"
      aria-hidden={props.ariaHidden}
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundColor: props.backgroundColor,
      }}
    />
  );
};

export default Icon;
