import React, { useEffect } from "react";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import WithMEDL from "./MedlFetch";
import MedlHistorikkView from "./MedlHistorikkView";

/*
  Hent data
  Obs! Merk at listen består av
  Unntak fra medlemskap i folketrygden
*/

const MedlHistorikk = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"medl.tittel"}
      icon={MEDLIkon}
      backTo={"/#flere-opplysninger"}
      brodsmulesti={[{ title: "medl.tittel" }]}
    >
      <WithMEDL>{({ data }) => <MedlHistorikkView medlInfo={data} />}</WithMEDL>
    </PageContainer>
  );
};

export default MedlHistorikk;
