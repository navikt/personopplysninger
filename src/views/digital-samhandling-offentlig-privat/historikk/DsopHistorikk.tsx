import { useEffect } from "react";
import DSOPIkon from "@/assets/img/DSOP.svg";
import MedHentetData from "@/components/hentetData/MedHentetData";
import PageContainer from "@/components/pagecontainer/PageContainer";
import type { DsopHistorikkInfo } from "@/types/dsop";
import type { HentetData } from "@/types/hentetData";
import DsopHistorikkView from "./DsopHistorikkView";

interface Props {
    dsopInfo: HentetData<DsopHistorikkInfo>;
    pathname?: string;
}

const DsopHistorikk = ({ dsopInfo, pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"dsop.tittel"}
            icon={DSOPIkon}
            backTo={"/#flere-opplysninger"}
            brodsmulesti={[{ title: "dsop.tittel" }]}
            pathname={pathname}
        >
            <MedHentetData hentet={dsopInfo}>{(data) => <DsopHistorikkView dsopInfo={data} pathname={pathname} />}</MedHentetData>
        </PageContainer>
    );
};
export default DsopHistorikk;
