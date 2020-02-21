import React, { useEffect } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import { useIntl } from "react-intl";
import arbeidsforholdIkon from "assets/img/Arbeidsforhold.svg";
import PageContainer from "components/pagecontainer/PageContainer";
import { useParams } from "react-router-dom";

const miljo = process.env.REACT_APP_MILJO as
  | "LOCAL"
  | "Q6"
  | "Q2"
  | "Q1"
  | "Q0"
  | "PROD";

interface Routes {
  id: string;
}

const radix = 10;
const Arbeidsforhold = () => {
  const { locale } = useIntl();
  const params = useParams<Routes>();
  const id: number = parseInt(params.id, radix);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId="arbeidsforhold.tittel"
      icon={arbeidsforholdIkon}
      brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
      backTo={"/#arbeidsforhold"}
    >
      <DetaljertArbeidsforhold
        rolle={"ARBEIDSTAKER"}
        locale={locale as "nb" | "en"}
        miljo={miljo}
        navArbeidsforholdId={id}
      />
    </PageContainer>
  );
};

export default Arbeidsforhold;
