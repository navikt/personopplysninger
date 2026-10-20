import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import DSOPIkon from "@/assets/img/DSOP.svg";
import MedHentetData from "@/components/hentetData/MedHentetData";
import PageContainer from "@/components/pagecontainer/PageContainer";
import type { DsopDetaljInnslag } from "@/types/dsop";
import type { HentetData } from "@/types/hentetData";
import DsopDetaljerView from "./DsopDetaljerView";

interface Props {
    innslag: HentetData<DsopDetaljInnslag | undefined>;
    pathname?: string;
}

const DsopDetaljer = ({ innslag, pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"dsop.tittel"}
            icon={DSOPIkon}
            backTo={"/dsop"}
            brodsmulesti={[{ title: "dsop.tittel", path: "/dsop" }, { title: "dsop.levertedata" }]}
            pathname={pathname}
        >
            <MedHentetData hentet={innslag}>
                {(funnet) =>
                    funnet ? (
                        <DsopDetaljerView innslag={funnet} />
                    ) : (
                        <div>
                            <FormattedMessage id="dsop.ingendata" />
                        </div>
                    )
                }
            </MedHentetData>
        </PageContainer>
    );
};

export default DsopDetaljer;
