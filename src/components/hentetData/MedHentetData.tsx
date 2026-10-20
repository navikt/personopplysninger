import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import type { HentetData } from "@/types/hentetData";

interface Props<T> {
    hentet: HentetData<T>;
    children: (data: T) => JSX.Element;
}

const MedHentetData = <T,>({ hentet, children }: Props<T>) =>
    hentet.status === "RESULT" ? children(hentet.data) : <ErrorMessage error={hentet.error} />;

export default MedHentetData;
