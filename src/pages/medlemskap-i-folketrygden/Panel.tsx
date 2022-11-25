import React from "react";
import { MedlInnslag } from "types/medl";
import { FormattedMessage } from "react-intl";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Normaltekst } from "nav-frontend-typografi";
import Periode from "./Periode";

interface Props {
  tittelId: string;
  tittelIdIngress: string;
  perioder: MedlInnslag[];
}

const Panel = (props: Props) => {
  const { perioder } = props;
  const { tittelId, tittelIdIngress } = props;
  return (
    <Ekspanderbartpanel
      tittel={<FormattedMessage id={tittelId} />}
      className={"medl__space"}
      border={true}
    >
      <Normaltekst>
        <FormattedMessage id={tittelIdIngress} />
      </Normaltekst>
      <div className={"medl__flex-table "}>
        {perioder.map((periode, i) => (
          <Periode key={i} periode={periode} />
        ))}
      </div>
    </Ekspanderbartpanel>
  );
};

export default Panel;
