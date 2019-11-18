import React from "react";
import PageContainer from "../../components/pagecontainer/PageContainer";
import DSOPIkon from "../../assets/img/DSOP.svg";
import WithINST from "./INST";

export const InstHistorik = () => (
  <PageContainer
    tittelId={"dsop.tittel"}
    icon={DSOPIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "dsop.tittel" }]}
  >
    <WithINST />
  </PageContainer>
);
