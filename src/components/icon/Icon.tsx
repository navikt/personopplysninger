import React from "react";

interface Props {
  backgroundImage?: string;
  backgroundColor?: string;
  ariaVisible?: string;
}
const Icon = (props: Props) => (
  <div
    className="icon__circle"
    aria-visible={props.ariaVisible}
    style={{
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundColor: props.backgroundColor,
    }}
  />
);

export default Icon;
