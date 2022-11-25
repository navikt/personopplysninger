import React, { useEffect } from "react";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithInst from "../InstFetch";
import Tabell from "./Tabell";

const InstHistorikk = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"inst.tittel"}
      icon={INSTIkon}
      backTo={"/#flere-opplysninger"}
      brodsmulesti={[{ title: "inst.tittel" }]}
    >
      <WithInst>{({ data }) => <Tabell instInfo={data} />}</WithInst>
    </PageContainer>
  );
};

export default InstHistorikk;
