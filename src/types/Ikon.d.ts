declare module "nav-frontend-ikoner-assets" {
  import * as React from "react";

  interface IkonProps {
    height?: number | string;
    width?: number | string;
    kind: IkonType;
    size?: number | string;
    className?: string;
  }

  type IkonType = "info-sirkel" | "info-sirkel-fyll" | "feil-sirkel-fyll" | "ok-sirkel-fyll";

  export default class Ikon extends React.Component<IkonProps, {}> {}
}
