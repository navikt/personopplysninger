import React, { useEffect } from "react";
import Error, { HTTPError } from "../../../../components/error/Error";
import Personalia from "./personalia/Personalia";
import Adresser from "./adresser/Adresser";
import DittNavKontor from "./ditt-nav-kontor/DittNavKontor";
import Spinner from "../../../../components/spinner/Spinner";
import { PersonInfo } from "../../../../types/personInfo";
import { fetchPersonInfo, sendTilLogin } from "../../../../clients/apiClient";
import { useStore } from "../../../../providers/Provider";
import KontaktInfo from "./kontakt-informasjon/KontaktInfo";
import Utbetalinger from "./utbetalinger/Utbetalinger";

export type FetchPersonInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

const VisPersonInfo = () => {
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
          error.code === 401 || error.code === 403
            ? sendTilLogin()
            : dispatch({ type: "SETT_KONTAKT_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (personInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const elements = [];
      const { personalia, adresser, enhetKontaktInformasjon } = personInfo.data;

      if (personalia) {
        elements.push(<Personalia key="p" personalia={personalia} />);
        elements.push(<KontaktInfo key="k" personalia={personalia} />);
      }

      if (adresser) {
        elements.push(<Adresser key="a" adresser={adresser} />);

        if (
          adresser.geografiskTilknytning &&
          enhetKontaktInformasjon &&
          enhetKontaktInformasjon.enhet
        ) {
          elements.push(
            <DittNavKontor
              key="d"
              enhetKontaktInfo={enhetKontaktInformasjon.enhet}
              geografiskTilknytning={adresser.geografiskTilknytning}
            />
          );
        }
      }

      if (personalia) {
        elements.push(<Utbetalinger key="u" personalia={personalia} />);
      }

      return <>{elements}</>;
    case "ERROR":
      return <Error error={personInfo.error} />;
  }
};

export default VisPersonInfo;
