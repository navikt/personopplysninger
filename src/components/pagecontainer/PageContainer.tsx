import { Box, Heading } from "@navikt/ds-react";
import type React from "react";
import { FormattedMessage } from "react-intl";
import Icon from "@/components/icon/Icon";
import Tilbake from "@/components/tilbake/Tilbake";
import Brodsmulesti, { type BrodsmuleLenke } from "@/pages/forside/sections/2-brodsmulesti/Brodsmulesti";
import pcStyles from "./PageContainer.module.css";

interface Props {
    children: React.ReactNode;
    tittelId: string;
    backTo: string;
    icon?: string;
    brodsmulesti: BrodsmuleLenke[];
}

const PageContainer = (props: Props) => {
    return (
        <div className={pcStyles.container}>
            <Brodsmulesti hierarki={props.brodsmulesti} />
            {props.icon && (
                <div className={pcStyles.icon}>
                    <Icon backgroundImage={props.icon} backgroundColor="#99C1E9" />
                </div>
            )}
            <div className={pcStyles.rad}>
                <div className={pcStyles.back}>
                    <Tilbake to={props.backTo} />
                </div>
                <div className={pcStyles.overskrift}>
                    <Heading size={"medium"} level={"2"}>
                        <FormattedMessage id={props.tittelId} values={{ br: () => <br /> }} />
                    </Heading>
                </div>
                <div className={pcStyles.filler} />
            </div>
            <Box background="surface-default" className={pcStyles.innhold}>
                {props.children}
            </Box>
        </div>
    );
};

export default PageContainer;
