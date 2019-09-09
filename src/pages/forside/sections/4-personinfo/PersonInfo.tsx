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
import personaliaIkon from "../../../../assets/img/Personalia.svg";
import Box from "../../../../components/box/Box";
import Utbetalinger from "./5-utbetalinger/Utbetalinger";

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
      const { personalia, adresser, enhetKontaktInformasjon } = personInfo.data;
      return (
        <>
          {personalia && (
            <>
              <Personalia personalia={personalia} />
              <KontaktInfo tlfnr={personalia.tlfnr} />
            </>
          )}
          {adresser && (
            <>
              <Adresser adresser={adresser} />
              {adresser.geografiskTilknytning && enhetKontaktInformasjon && (
                <DittNavKontor
                  enhetKontaktInformasjon={enhetKontaktInformasjon}
                  geografiskTilknytning={adresser.geografiskTilknytning}
                />
              )}
            </>
          )}
          {personalia && (
            <Utbetalinger
              kontonr={personalia.kontonr}
              utenlandskbank={personalia.utenlandskbank}
            />
          )}
        </>
      );
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
