/* eslint-disable react/no-danger */

import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  description: string;
  content: {
    __html: string;
  };
}
const Alternativ = (props: Props) => {
  const { description, content } = props;
  return (
    <React.Fragment>
      <Ekspanderbartpanel tittel={description} tittelProps="element">
        <Normaltekst>
          <div dangerouslySetInnerHTML={content} />
        </Normaltekst>
      </Ekspanderbartpanel>
    </React.Fragment>
  );
};

export default Alternativ;
