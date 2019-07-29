import React from "react";
import { DsopInfo } from "../../types/dsop";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  dsopInfo: DsopInfo;
}

interface Routes {
  id: string;
}

const DsopDetaljer = (props: Props & RouteComponentProps<Routes>) => {
  const { dsopInfo } = props;
  const { id } = props.match.params;

  const dsopInnslag = dsopInfo
    .filter(d => d.uthentingsTidspunkt === id)
    .shift();

  console.log(dsopInnslag);
  return <div>Test</div>;
};

export default withRouter(DsopDetaljer);
