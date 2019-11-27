import React from "react";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithSkatt from "./SkattFetch";

export const SkattkortHistorik = () => (
  <PageContainer
    tittelId={"inst.tittel"}
    icon={INSTIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "inst.tittel" }]}
  >
    <WithSkatt>
      {({ data, id }) => (
        <div>
          {id ? (
            <div>{id}</div>
          ) : (
            <div>
              <>{console.log(data)}</>
            </div>
          )}
        </div>
      )}
    </WithSkatt>
  </PageContainer>
);

export const SkattkortDetaljer = () => (
  <PageContainer
    tittelId={"inst.tittel"}
    icon={INSTIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "inst.tittel" }]}
  >
    <WithSkatt>
      {({ data, id }) => (
        <div>
          {id ? (
            <div>{id}</div>
          ) : (
            <div>
              <>{console.log(data)}</>
            </div>
          )}
        </div>
      )}
    </WithSkatt>
  </PageContainer>
);
