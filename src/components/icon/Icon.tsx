import React from "react";

interface Props {
  backgroundImage?: string;
  backgroundColor?: string;
}
const Icon = (props: Props) => (
  <div
    className="icon__circle"
    style={{
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundColor: props.backgroundColor
    }}
  />
);

export default Icon;
