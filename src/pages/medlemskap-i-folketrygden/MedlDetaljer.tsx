import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithMEDL from "./MedlFetch";

interface Routes {
  id: string;
}

const MedlDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"inst.tittel"}
      icon={INSTIkon}
      backTo={"/dsop"}
      brodsmulesti={[
        { title: "dsop.tittel", path: "/dsop" },
        { title: "dsop.levertedata" }
      ]}
    >
      <WithMEDL>
        {({ data }) => {
          const dsopInnslag = data
            .filter(d => d.uthentingsTidspunkt === id)
            .shift();

          return dsopInnslag ? (
            // Todo: Implementer visning
            <div />
          ) : (
            <div>
              <FormattedMessage id="dsop.ingendata" />
            </div>
          );
        }}
      </WithMEDL>
    </PageContainer>
  );
};

export default MedlDetaljer;
