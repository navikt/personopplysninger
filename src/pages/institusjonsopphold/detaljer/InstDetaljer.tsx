import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import INSTIkon from "@/assets/img/Institusjonsopphold.svg";
import Kilde from "@/components/kilde/Kilde";
import PageContainer from "@/components/pagecontainer/PageContainer";
import instStyles from "../Inst.module.css";
import WithInst from "../InstFetch";
import InstDetaljerView from "./InstDetaljerView";

interface Props {
    id?: string;
    pathname?: string;
}

const InstDetaljer = ({ id, pathname }: Props) => {
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
            <WithInst>
                {({ data }) => {
                    const innslag = data.filter((d) => d.registreringstidspunkt === id).shift();

                    return innslag ? (
                        <InstDetaljerView innslag={innslag} />
                    ) : (
                        <div>
                            <FormattedMessage id="inst.ingendata" />
                        </div>
                    );
                }}
            </WithInst>
            <div className={instStyles.kilde}>
                <Kilde kilde="inst.kilde" lenkeType="INGEN" />
            </div>
        </PageContainer>
    );
};

export default InstDetaljer;
