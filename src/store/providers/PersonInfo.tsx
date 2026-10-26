import { useEffect } from "react";
import { fetchPersonInfo } from "@/clients/apiClient";
import type { HTTPError } from "@/components/errorMessage/ErrorMessage";
import { useStore } from "@/store/Context";
import type { PersonInfo } from "@/types/personInfo";

export type FetchPersonInfo = { status: "LOADING" } | { status: "RESULT"; data: PersonInfo } | { status: "ERROR"; error: HTTPError };

interface Props {
    loader: JSX.Element;
    error: (error: HTTPError) => JSX.Element;
    children: (data: PersonInfo) => JSX.Element;
}

export const useLoadPersonInfo = () => {
    const [{ personInfo }, dispatch] = useStore();

    useEffect(() => {
        if (personInfo.status === "LOADING") {
            fetchPersonInfo()
                .then((personInfo) =>
                    dispatch({
                        type: "SETT_PERSON_INFO_RESULT",
                        payload: personInfo as PersonInfo,
                    }),
                )
                .catch((error: HTTPError) => dispatch({ type: "SETT_PERSON_INFO_ERROR", payload: error }));
        }
    }, [personInfo, dispatch]);

    return personInfo;
};

const MedPersonInfo = (props: Props) => {
    const personInfo = useLoadPersonInfo();

    switch (personInfo.status) {
        case "LOADING":
            return props.loader;
        case "RESULT":
            return props.children(personInfo.data);
        case "ERROR":
            return props.error(personInfo.error);
    }
};

export default MedPersonInfo;
