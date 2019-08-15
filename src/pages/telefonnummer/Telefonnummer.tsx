import React, { useEffect } from "react";
import PageContainer from "../../components/pagecontainer/PageContainer";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import { useStore } from "../../providers/Provider";
import { fetchPersonInfo } from "../../clients/apiClient";
import { PersonInfo } from "../../types/personInfo";
import Error, { HTTPError } from "../../components/error/Error";
import Spinner from "../../components/spinner/Spinner";

const Telefonnummer = () => {
  const [{ personInfo }, dispatch] = useStore();

  useEffect(() => {
    if (personInfo.status === "LOADING") {
      fetchPersonInfo()
        .then(personInfo =>
          dispatch({
            type: "SETT_PERSON_INFO_RESULT",
            payload: personInfo as PersonInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_PERSON_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (personInfo.status) {
    default:
    case "LOADING":
      return (
        <PageContainer
          tittelId="arbeidsforhold.tittel"
          brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
          icon={arbeidsforholdIkon}
          backTo={"/"}
        >
          <Spinner />
        </PageContainer>
      );
    case "RESULT":
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
    case "ERROR":
      return (
        <PageContainer
          tittelId="arbeidsforhold.tittel"
          brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
          icon={arbeidsforholdIkon}
          backTo={"/"}
        >
          <Error error={personInfo.error} />
        </PageContainer>
      );
  }
};

export default Telefonnummer;
