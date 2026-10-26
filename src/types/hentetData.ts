import type { HTTPError } from "@/components/errorMessage/ErrorMessage";

export type HentetData<T> = { status: "RESULT"; data: T } | { status: "ERROR"; error: HTTPError };
