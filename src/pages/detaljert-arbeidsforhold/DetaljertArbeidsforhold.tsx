import React, { useEffect } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import PageContainer from "../../components/pagecontainer/PageContainer";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

interface Routes {
  id: string;
}

const radix = 10;
type MergedProps = RouteComponentProps<Routes> & InjectedIntlProps;
const Arbeidsforhold = (props: MergedProps) => {
  const { match, intl } = props;
  const id: number = parseInt(match.params.id, radix);

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

export default injectIntl(withRouter(Arbeidsforhold));
