import { useEffect } from "react";
import DSOPIkon from "@/assets/img/DSOP.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import WithDSOP from "../DsopFetch";
import DsopHistorikkView from "./DsopHistorikkView";

interface Props {
    pathname?: string;
}

const DsopHistorikk = ({ pathname }: Props) => {
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
            <WithDSOP>{({ data }) => <DsopHistorikkView dsopInfo={data} pathname={pathname} />}</WithDSOP>
        </PageContainer>
    );
};
export default DsopHistorikk;
