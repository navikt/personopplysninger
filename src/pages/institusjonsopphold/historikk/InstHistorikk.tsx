import { useEffect } from "react";
import INSTIkon from "@/assets/img/Institusjonsopphold.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import WithInst from "../InstFetch";
import InstHistorikkView from "./InstHistorikkView";

interface Props {
    pathname?: string;
}

const InstHistorikk = ({ pathname }: Props) => {
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
            <WithInst>{({ data }) => <InstHistorikkView instInfo={data} pathname={pathname} />}</WithInst>
        </PageContainer>
    );
};

export default InstHistorikk;
