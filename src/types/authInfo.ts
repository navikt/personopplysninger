import { HTTPError } from "../components/error/Error";

export type Auth = {
  authenticated: boolean;
  securityLevel: "4" | "3";
  name: string;
};

export type FetchAuth =
  | { status: "LOADING" }
  | { status: "RESULT"; data: Auth }
  | { status: "ERROR"; error: HTTPError };
