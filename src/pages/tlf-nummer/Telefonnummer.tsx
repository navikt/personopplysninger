import React from "react";
import PageContainer from "../../components/pagecontainer/PageContainer";

const Telefonnummer = () => {
  return (
    <PageContainer
      tittelId="arbeidsforhold.tittel"
      brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
      backTo={"/"}
    >
      <div>Hello</div>
    </PageContainer>
  );
};

export default Telefonnummer;
