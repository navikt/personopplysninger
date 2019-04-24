import React from "react";

interface Props {
  backgroundImage?: string;
}
const Icon = (props: Props) => (
  <div
    className="icon__circle"
    style={{
      backgroundImage: `url(${props.backgroundImage})`
    }}
  />
);

export default Icon;
