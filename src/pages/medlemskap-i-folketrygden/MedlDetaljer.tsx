import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import WithMEDL from "./MedlFetch";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";
import MEDLIkon from "assets/img/MEDL.svg";
import moment from "moment";

interface Routes {
  id: string;
}

const MedlDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"medl.tittel"}
      backTo={"/medlemskap-i-folketrygden"}
      icon={MEDLIkon}
      brodsmulesti={[
        { title: "medl.tittel", path: "/medlemskap-i-folketrygden" },
        { title: "medl.detaljer" }
      ]}
    >
      <WithMEDL>
        {({ data }) => {
          const innslag = data
            .filter(d => d.unntakId.toString() === id)
            .shift();

          return innslag ? (
            <div>
              <div className="detaljer__tittel">
                <Undertittel>{innslag.grunnlag}</Undertittel>
                <Normaltekst>
                  {`${moment(innslag.fraOgMed).format("DD.MM.YYYY")} - ${
                    innslag.tilOgMed
                      ? moment(innslag.tilOgMed).format("DD.MM.YYYY")
                      : ``
                  }`}
                </Normaltekst>
              </div>
              <hr className="box__linje-bred" />
              <div className="box">
                <div className="box__content">
                  <ul className="list-column-2">
                    <ListElement
                      titleId={"medl.status"}
                      content={innslag.status}
                    />
                    <ListElement
                      titleId={"medl.statusaarsak"}
                      content={innslag.statusaarsak}
                    />
                    <ListElement
                      titleId={"medl.dekning"}
                      content={innslag.dekning}
                    />
                    <ListElement
                      titleId={"medl.helsedel"}
                      content={innslag.helsedel ? "Ja" : "Nei"}
                    />
                    <ListElement
                      titleId={"medl.lovland"}
                      content={innslag.lovvalg}
                    />
                    <ListElement
                      titleId={"medl.lovvalgsland"}
                      content={innslag.lovvalgsland}
                    />
                    <ListElement
                      titleId={"medl.medlem"}
                      content={innslag.medlem ? "Ja" : "Nei"}
                    />

                    <ListElement
                      titleId={"medl.unntakId"}
                      content={innslag.unntakId.toString()}
                    />
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <FormattedMessage id="medl.ingendata" />
            </div>
          );
        }}
      </WithMEDL>
    </PageContainer>
  );
};

export default MedlDetaljer;
