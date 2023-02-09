import React from "react";
import { FormattedMessage } from "react-intl";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";
import { BodyShort, Label } from "@navikt/ds-react";

interface Props {
  title?: string;
  titleId?: string;
  hjelpetekstId?: string;
  content?: string | JSX.Element | null;
  children?: JSX.Element | JSX.Element[];
  className?: string;
}

const ListElement = (props: Props) => {
  const { content, title, titleId, hjelpetekstId, children, className } = props;
  return content ? (
    <div className={"list-item"}>
      <div className={"listelement__header"}>
        <dt>
          <Label as="p">
            {titleId ? <FormattedMessage id={titleId} /> : title}
          </Label>
        </dt>
        {hjelpetekstId && (
          <CustomHelpText>
            <FormattedMessage id={hjelpetekstId} />
          </CustomHelpText>
        )}
      </div>
      <div className={`content ${className || ""}`}>
        <dd>{content}</dd>
      </div>
      <BodyShort>{children}</BodyShort>
    </div>
  ) : null;
};

export default ListElement;
