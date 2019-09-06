import React, { useEffect } from "react";
import Error, { HTTPError } from "../../../../components/error/Error";
import Personalia from "./1-personalia/Personalia";
import Adresser from "./3-adresser/Adresser";
import DittNavKontor from "./4-ditt-nav-kontor/DittNavKontor";
import Spinner from "../../../../components/spinner/Spinner";
import { PersonInfo } from "../../../../types/personInfo";
import { fetchPersonInfo } from "../../../../clients/apiClient";
import { useStore } from "../../../../providers/Provider";
import KontaktInfo from "./2-kontaktinfo/KontaktInfo";
import Utbetalinger from "./5-utbetalinger/Utbetalinger";
import UtbetalingerPDL from "./5-utbetalinger/Utbetalinger-PDL";
import personaliaIkon from "../../../../assets/img/Personalia.svg";
import Box from "../../../../components/box/Box";
import AdresserPDL from "./3-adresser/Adresser-PDL";

export type FetchPersonInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

const VisPersonInfo = () => {
  const [{ personInfo, featureToggles }, dispatch] = useStore();

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
        <Box
          id="personalia"
          tittel="personalia.tittel"
          beskrivelse="personalia.beskrivelse"
          icon={personaliaIkon}
        >
          <Spinner />
        </Box>
      );
    case "RESULT":
      const elements = [];
      const { personalia, adresser, enhetKontaktInformasjon } = personInfo.data;

      if (personalia) {
        elements.push(<Personalia key="p" personalia={personalia} />);
        elements.push(<KontaktInfo key="k" personalia={personalia} />);
      }

      if (adresser) {
        if (featureToggles.data["personopplysninger.pdl"]) {
          elements.push(<AdresserPDL key="a" adresser={adresser} />);
        } else {
          elements.push(<Adresser key="a" adresser={adresser} />);
        }

        if (adresser.geografiskTilknytning) {
          if (enhetKontaktInformasjon && enhetKontaktInformasjon.enhet) {
            elements.push(
              <DittNavKontor
                key="d"
                enhetKontaktInfo={enhetKontaktInformasjon.enhet}
                geografiskTilknytning={adresser.geografiskTilknytning}
              />
            );
          }
        }
      }

      if (personalia) {
        if (featureToggles.data["personopplysninger.pdl"]) {
          elements.push(<UtbetalingerPDL key="u" personalia={personalia} />);
        } else {
          elements.push(<Utbetalinger key="u" personalia={personalia} />);
        }
      }

      return <>{elements}</>;
    case "ERROR":
      return (
        <Box
          id="personalia"
          tittel="personalia.tittel"
          beskrivelse="personalia.beskrivelse"
          icon={personaliaIkon}
        >
          <Error error={personInfo.error} />
        </Box>
      );
  }
};

export default VisPersonInfo;
