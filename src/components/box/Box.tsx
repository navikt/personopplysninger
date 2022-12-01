import React from "react";
import { FormattedMessage } from "react-intl";
import Infotekst from "components/infotekst/Infotekst";
import { AnchorLink } from "../anchorlink/AnchorLink";
import { GuidePanel, Heading } from "@navikt/ds-react";

interface Props {
  id: string;
  tittel: string;
  visAnkerlenke?: boolean;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { tittel, beskrivelse, icon, children, id, visAnkerlenke } = props;
  const Veileder = <img src={icon} className="box__ikon" alt="" />;

  return (
    <div className="box__wrapper" id={id}>
      <GuidePanel illustration={Veileder} poster={true}>
        <div className="box__container">
          <div className="box__header">
            <div className="box__title-container">
              <div className="box__line" />
              {tittel && (
                <Heading size={"medium"} level={"2"} className="box__title">
                  <FormattedMessage id={tittel} />
                </Heading>
              )}
              {beskrivelse && <Infotekst beskrivelse={beskrivelse} />}
              <div className="box__line" />
            </div>
            {visAnkerlenke && <AnchorLink id={id} />}
          </div>
          <div className="box__content">{children}</div>
        </div>
      </GuidePanel>
    </div>
  );
};

export default Box;
