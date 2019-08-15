import React from "react";
import PageContainer from "../../components/pagecontainer/PageContainer";
import DSOPIkon from "../../assets/img/DSOP.svg";
import WithDSOP from "./DSOP";

export const DsopHistorik = () => (
  <PageContainer
    tittelId={"dsop.tittel"}
    icon={DSOPIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "dsop.tittel" }]}
  >
    <WithDSOP />
  </PageContainer>
);

export const DsopDetaljer = () => (
  <PageContainer
    tittelId={"dsop.tittel"}
    icon={DSOPIkon}
    backTo={"/dsop"}
    brodsmulesti={[
      { title: "dsop.tittel", path: "/dsop" },
      { title: "dsop.levertedata" }
    ]}
  >
    <WithDSOP />
  </PageContainer>
);
