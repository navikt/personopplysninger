import React from "react";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import WithMEDL from "./MedlFetch";
import Perioder from "./Perioder";

/*
  Hent data
  Obs! Merk at listen består av
  Unntak fra medlemskap i folketrygden
*/

const MedlHistorikk = () => (
  <PageContainer
    tittelId={"medl.tittel"}
    icon={MEDLIkon}
    backTo={"/#flere-opplysninger"}
    brodsmulesti={[{ title: "medl.tittel" }]}
  >
    <WithMEDL>{({ data }) => <Perioder medlInfo={data} />}</WithMEDL>
  </PageContainer>
);

export default MedlHistorikk;
