import dayjs from "dayjs";
import type { InstInfo, InstInnslag } from "@/types/inst";

export const sorterOpphold = (opphold: InstInfo) => [...opphold].sort((a, b) => (dayjs(a.startdato) > dayjs(b.startdato) ? -1 : 1));

export const periode = (innslag: InstInnslag) => {
    const startdato = dayjs(innslag.startdato).format("DD.MM.YYYY");
    const faktiskSluttdato = innslag.faktiskSluttdato ? dayjs(innslag.faktiskSluttdato).format("DD.MM.YYYY") : "";

    return `${startdato} - ${faktiskSluttdato}`;
};
