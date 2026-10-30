import type { HTTPError } from "@/components/errorMessage/ErrorMessage";
import type { PersonInfo } from "@/types/personInfo";

export type FetchPersonInfo = { status: "LOADING" } | { status: "RESULT"; data: PersonInfo } | { status: "ERROR"; error: HTTPError };
