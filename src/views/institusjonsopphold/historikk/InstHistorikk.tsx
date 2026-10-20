import { useEffect } from "react";
import INSTIkon from "@/assets/img/Institusjonsopphold.svg";
import MedHentetData from "@/components/hentetData/MedHentetData";
import PageContainer from "@/components/pagecontainer/PageContainer";
import type { HentetData } from "@/types/hentetData";
import type { InstInfo } from "@/types/inst";
import InstHistorikkView from "./InstHistorikkView";

interface Props {
    instInfo: HentetData<InstInfo>;
    pathname?: string;
}

const InstHistorikk = ({ instInfo, pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"inst.tittel"}
            icon={INSTIkon}
            backTo={"/#flere-opplysninger"}
            brodsmulesti={[{ title: "inst.tittel" }]}
            pathname={pathname}
        >
            <MedHentetData hentet={instInfo}>{(data) => <InstHistorikkView instInfo={data} pathname={pathname} />}</MedHentetData>
        </PageContainer>
    );
};

export default InstHistorikk;
