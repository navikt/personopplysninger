import { Button } from "@navikt/ds-react";
import FileSaver from "file-saver";
import type { Language } from "@/language/language";
import { text } from "../dsopText";

interface Props {
    language: Language;
    leverteData: string;
}

const LastNedData = ({ language, leverteData }: Props) => (
    <Button
        variant="primary"
        onClick={() =>
            FileSaver.saveAs(new Blob([JSON.stringify(JSON.parse(atob(leverteData)), null, 2)], { type: "application/json" }), "utleverte-data.json")
        }
    >
        {text.lastNed[language]}
    </Button>
);

export default LastNedData;
