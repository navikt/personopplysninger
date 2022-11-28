import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import DSOPIkon from "assets/img/DSOP.svg";
import WithDSOP from "../DsopFetch";
import DsopDetaljerView from "./DsopDetaljerView";

interface Routes {
  id: string;
}

const DsopDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"dsop.tittel"}
      icon={DSOPIkon}
      backTo={"/dsop"}
      brodsmulesti={[
        { title: "dsop.tittel", path: "/dsop" },
        { title: "dsop.levertedata" },
      ]}
    >
      <WithDSOP>
        {({ data }) => <DsopDetaljerView dsopInfo={data} id={id} />}
      </WithDSOP>
    </PageContainer>
  );
};

export default DsopDetaljer;
