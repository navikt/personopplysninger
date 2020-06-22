import React, { useEffect } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import { useIntl } from "react-intl";
import arbeidsforholdIkon from "assets/img/Arbeidsforhold.svg";
import PageContainer from "components/pagecontainer/PageContainer";
import { useParams } from "react-router-dom";
import { useStore } from "../../store/Context";

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
  const [{ personInfo }] = useStore();
  const id: number = parseInt(params.id, radix);

  const printName =
    personInfo.status === "RESULT"
      ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}`
      : ``;

  const printSSN =
    personInfo.status === "RESULT"
      ? `${personInfo.data.personalia?.personident?.verdi}`
      : ``;

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
        miljo={miljo}
        locale={locale as "nb" | "en"}
        navArbeidsforholdId={id}
        printActivated={true}
        printName={printName}
        printSSN={printSSN}
      />
    </PageContainer>
  );
};

export default Arbeidsforhold;
