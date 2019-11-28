import React, { useEffect } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../Environments";
import { injectIntl, InjectedIntlProps } from "react-intl";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import PageContainer from "../../components/pagecontainer/PageContainer";
import { useParams } from "react-router-dom";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "Q0" | "Q1" | "PROD";

interface Routes {
  id: string;
}

const radix = 10;
type MergedProps = InjectedIntlProps;
const Arbeidsforhold = (props: MergedProps) => {
  const params = useParams<Routes>();
  const { intl } = props;
  const id: number = parseInt(params.id, radix);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId="arbeidsforhold.tittel"
      icon={arbeidsforholdIkon}
      brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
      backTo={"/"}
    >
      <DetaljertArbeidsforhold
        locale={intl.locale as "nb" | "en"}
        miljo={miljo}
        navArbeidsforholdId={id}
      />
    </PageContainer>
  );
};

export default injectIntl(Arbeidsforhold);
