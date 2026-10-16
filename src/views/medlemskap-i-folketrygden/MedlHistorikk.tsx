import { useEffect } from "react";
import MEDLIkon from "@/assets/img/MEDL.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import WithMEDL from "./MedlFetch";
import MedlHistorikkView from "./MedlHistorikkView";

/*
  Hent data
  Obs! Merk at listen består av
  Unntak fra medlemskap i folketrygden
*/

interface Props {
    pathname?: string;
}

const MedlHistorikk = ({ pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"medl.tittel"}
            icon={MEDLIkon}
            backTo={"/#flere-opplysninger"}
            brodsmulesti={[{ title: "medl.tittel" }]}
            pathname={pathname}
        >
            <WithMEDL>{({ data }) => <MedlHistorikkView medlInfo={data} />}</WithMEDL>
        </PageContainer>
    );
};

export default MedlHistorikk;
