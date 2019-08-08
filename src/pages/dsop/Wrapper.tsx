import React from "react";
import Brodsmulesti from "../forside/sections/2-brodsmulesti/Brodsmulesti";
import PageContainer from "../../components/pagecontainer/PageContainer";
import WithDSOP from "./DSOP";

export const DsopHistorikkMedBrodsmule = () => (
  <>
    <Brodsmulesti hierarchy={[{ title: "dsop.tittel" }]} />
    <PageContainer>
      <WithDSOP />
    </PageContainer>
  </>
);

export const DsopDetaljerMedBrodsmule = () => (
  <>
    <Brodsmulesti
      hierarchy={[
        { title: "dsop.tittel", path: "/dsop" },
        { title: "dsop.levertedata" }
      ]}
    />
    <PageContainer>
      <WithDSOP />
    </PageContainer>
  </>
);
