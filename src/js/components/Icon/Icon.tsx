import React, { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}
const Icon = (props: Props) => (
  <div className="icon__circle" style={{ backgroundColor: "#c6c2bf" }}>
    <img className="icon" {...props} />
  </div>
);

export default Icon;
