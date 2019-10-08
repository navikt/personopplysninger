import React from "react";
import redirectsJson from "utils/redirects.json";
import veilederIkon from "assets/img/VeilederGul.svg";
import Veilederpanel from "nav-frontend-veilederpanel";

const redirects: {
  [key: string]: {
    veileder: string;
    knappBeskrivelse: string;
    knapp: string;
    url: string;
  };
} = redirectsJson;

interface Props {
  tjeneste: string;
}

const RedirectPanel = (props: Props) => {
  const redirect = redirects[props.tjeneste];
  return (
    <Veilederpanel
      fargetema="advarsel"
      svg={<img src={veilederIkon} alt={"Veileder"} />}
      kompakt={true}
    >
      <div dangerouslySetInnerHTML={{ __html: redirect.veileder }} />
    </Veilederpanel>
  );
};

export default RedirectPanel;
