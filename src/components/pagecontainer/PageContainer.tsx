import React, { MouseEvent } from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Icon from "../../components/icon/Icon";
import PanelBase from "nav-frontend-paneler";
import { withRouter, RouteComponentProps } from "react-router";
import Tilbake from "../tilbake/Tilbake";
import Brodsmulesti, {
  BrodsmuleLenke
} from "../../pages/forside/sections/2-brodsmulesti/Brodsmulesti";

interface Props {
  children: JSX.Element | JSX.Element[];
  tittelId: string;
  backTo: string;
  icon?: string;
  brodsmulesti: BrodsmuleLenke[];
}

const PageContainer = (props: Props & RouteComponentProps) => {
  const goBack = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    props.history.goBack();
  };

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
          <Tilbake to={props.backTo} onClick={goBack} />
        </div>
        <div className="da__overskrift">
          <Systemtittel>
            <FormattedMessage id={props.tittelId} />
          </Systemtittel>
        </div>
        <div className="da__filler" />
      </div>
      <PanelBase border={true} className="da__innhold">
        {props.children}
      </PanelBase>
    </div>
  );
};

export default withRouter(PageContainer);
