import React, { MouseEvent } from "react";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import { HashLink as Link } from "react-router-hash-link";
import { basePath } from "../../App";
import { VenstreChevron } from "nav-frontend-chevron";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Icon from "../../components/icon/Icon";
import PanelBase from "nav-frontend-paneler";
import { RouteComponentProps, withRouter } from "react-router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Container = (props: Props & RouteComponentProps) => {
  const { history } = props;

  const goBack = (event: MouseEvent): void => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div className="da__container">
      <div className="da__icon">
        <Icon backgroundImage={arbeidsforholdIkon} backgroundColor="#99C1E9" />
      </div>
      <div className="da__rad">
        <div className="da__back">
          <Link to={`${basePath}/`} onClick={goBack}>
            <VenstreChevron />
            Tilbake
          </Link>
        </div>
        <div className="da__overskrift">
          <Systemtittel>
            <FormattedMessage id="dsop.tittel" />
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

export default withRouter(Container);
