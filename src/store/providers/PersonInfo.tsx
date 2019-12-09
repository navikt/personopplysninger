import React, { useEffect } from "react";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "store/Context";
import { fetchPersonInfo } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";

export type FetchPersonInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  loader: JSX.Element;
  children: (data: PersonInfo) => JSX.Element;
}

const MedPersonInfo = (props: Props) => {
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
  }, [personInfo, dispatch]);

  switch (personInfo.status) {
    case "LOADING":
      return props.loader;
    case "RESULT":
      return props.children(personInfo.data);
    case "ERROR":
      return <Error error={personInfo.error} />;
  }
};

export default MedPersonInfo;
