import { useEffect } from "react";
import DSOPIkon from "@/assets/img/DSOP.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import WithDSOP from "../DsopFetch";
import DsopDetaljerView from "./DsopDetaljerView";

interface Props {
    id?: string;
    pathname?: string;
}

const DsopDetaljer = ({ id, pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (typeof id === "undefined") {
        return null;
    }

    return (
        <PageContainer
            tittelId={"dsop.tittel"}
            icon={DSOPIkon}
            backTo={"/dsop"}
            brodsmulesti={[{ title: "dsop.tittel", path: "/dsop" }, { title: "dsop.levertedata" }]}
            pathname={pathname}
        >
            <WithDSOP>{({ data }) => <DsopDetaljerView dsopInfo={data} id={id} />}</WithDSOP>
        </PageContainer>
    );
};

export default DsopDetaljer;
