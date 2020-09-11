import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Icon from "components/icon/Icon";
import PanelBase from "nav-frontend-paneler";
import Tilbake from "components/tilbake/Tilbake";
import Brodsmulesti, {
  BrodsmuleLenke,
} from "pages/forside/sections/2-brodsmulesti/Brodsmulesti";

interface Props {
  children: JSX.Element | JSX.Element[];
  tittelId: string;
  backTo: string;
  icon?: string;
  brodsmulesti: BrodsmuleLenke[];
}

const PageContainer = (props: Props) => {
  return (
    <div className="da__container">
      <Brodsmulesti hierarki={props.brodsmulesti} />
      {props.icon && (
        <div className="da__icon">
          <Icon backgroundImage={props.icon} backgroundColor="#99C1E9" />
        </div>
      )}
      <div className="da__rad">
        <div className="da__back">
          <Tilbake to={props.backTo} />
        </div>
        <div className="da__overskrift">
          <Systemtittel>
            <FormattedMessage id={props.tittelId} />
          </Systemtittel>
        </div>
        <div className="da__filler" />
      </div>
      <PanelBase className="da__innhold">{props.children}</PanelBase>
    </div>
  );
};

export default PageContainer;
