import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import INSTIkon from "@/assets/img/Institusjonsopphold.svg";
import MedHentetData from "@/components/hentetData/MedHentetData";
import Kilde from "@/components/kilde/Kilde";
import PageContainer from "@/components/pagecontainer/PageContainer";
import type { HentetData } from "@/types/hentetData";
import type { InstInnslag } from "@/types/inst";
import instStyles from "../Inst.module.css";
import InstDetaljerView from "./InstDetaljerView";

interface Props {
    innslag: HentetData<InstInnslag | undefined>;
    pathname?: string;
}

const InstDetaljer = ({ innslag, pathname }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"inst.tittel"}
            icon={INSTIkon}
            backTo={"/institusjonsopphold"}
            brodsmulesti={[{ title: "inst.tittel", path: "/institusjonsopphold" }, { title: "inst.detaljer" }]}
            pathname={pathname}
        >
            <MedHentetData hentet={innslag}>
                {(funnet) =>
                    funnet ? (
                        <InstDetaljerView innslag={funnet} />
                    ) : (
                        <div>
                            <FormattedMessage id="inst.ingendata" />
                        </div>
                    )
                }
            </MedHentetData>
            <div className={instStyles.kilde}>
                <Kilde kilde="inst.kilde" lenkeType="INGEN" />
            </div>
        </PageContainer>
    );
};

export default InstDetaljer;
