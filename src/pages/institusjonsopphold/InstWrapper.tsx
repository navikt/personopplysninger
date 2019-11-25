import React from "react";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithINST from "./InstFetch";

export const InstHistorik = () => (
  <PageContainer
    tittelId={"inst.tittel"}
    icon={INSTIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "inst.tittel" }]}
  >
    <WithINST />
  </PageContainer>
);

export const InstDetaljer = () => (
  <PageContainer
    tittelId={"inst.tittel"}
    icon={INSTIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "inst.tittel" }]}
  >
    <WithINST />
  </PageContainer>
);
