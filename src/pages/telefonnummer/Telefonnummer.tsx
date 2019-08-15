import React from "react";
import PageContainer from "../../components/pagecontainer/PageContainer";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";

const Telefonnummer = () => {
  return (
    <PageContainer
      tittelId="arbeidsforhold.tittel"
      brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
      icon={arbeidsforholdIkon}
      backTo={"/"}
    >
      <div>Hello</div>
    </PageContainer>
  );
};

export default Telefonnummer;
