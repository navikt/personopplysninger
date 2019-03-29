import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import eksterneLenker from "./EksterneLenkerData";
import LinkBox from "../../components/linkbox/LinkBox";

const LinksContainer = () => (
  <div className="alternativer__box box-bottom-margin">
    <div className="alternativer__tittel-container">
      <Innholdstittel>
        <FormattedMessage id="alternativer.tittel" />
      </Innholdstittel>
    </div>
    {eksterneLenker.map(
      (link: any) =>
        link.visible && (
          <LinkBox
            id={link.id}
            key={link.id}
            icon={link.icon}
            tittel={link.tittel}
            beskrivelse={link.beskrivelse}
            lenkeTekst={link.lenkeTekst}
            url={link.url}
          />
        )
    )}
  </div>
);

export default LinksContainer;
