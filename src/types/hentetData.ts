import type { HTTPError } from "@/components/errorMessage/ErrorMessage";

// Data serveren har hentet før siden rendres. Øya viser enten dataene eller dagens feilmelding.
export type HentetData<T> = { status: "RESULT"; data: T } | { status: "ERROR"; error: HTTPError };
