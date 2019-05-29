import React, { useState, useEffect } from "react";
import Error, { HTTPError } from "../../../../components/error/Error";
import Header from "../3-header/Header";
import Personalia from "./personalia/Personalia";
import Adresser from "./adresser/Adresser";
import Spinner from "../../../../components/spinner/Spinner";
import { formatName } from "../../../../utils/text";
import { PersonInfo } from "../../../../types/personInfo";
import { fetchPersonInfo } from "../../../../clients/apiClient";
import { useStore } from "../../../../providers/Provider";

export type FetchPersonInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

const VisPersonInfo = () => {
  const [{ personInfo }, dispatch] = useStore();

  useEffect(() => {
    if (personInfo.status === "LOADING") {
      fetchPersonInfo()
        .then((personInfo: PersonInfo) =>
          dispatch({ type: "SETT_PERSON_INFO_RESULT", payload: personInfo })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_PERSON_INFO_ERROR", payload: error })
        );
    }
  }, []);

  switch (personInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const elements = [];
      const { personalia, adresser } = personInfo.data;

      if (personalia) {
        const fornavn = formatName(personalia.fornavn);
        elements.push(<Header key="h" fornavn={fornavn} />);
        elements.push(<Personalia key="p" personalia={personalia} />);
      }

      if (adresser) {
        elements.push(<Adresser key="a" adresser={adresser} />);
      }

      return <>{elements}</>;
    case "ERROR":
      return <Error error={personInfo.error} />;
  }
};

export default VisPersonInfo;
