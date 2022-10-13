import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithInst from "./InstFetch";
import PageContainer from "components/pagecontainer/PageContainer";
import { formatOrgnr, RADIX_DECIMAL } from "../../utils/formattering";
import Kilde from "../../components/kilde/Kilde";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";
import { BodyShort, Heading } from "@navikt/ds-react";

interface Routes {
  id: string;
}

const InstDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"inst.tittel"}
      icon={INSTIkon}
      backTo={"/institusjonsopphold"}
      brodsmulesti={[
        { title: "inst.tittel", path: "/institusjonsopphold" },
        { title: "inst.detaljer" },
      ]}
    >
      <WithInst>
        {({ data }) => {
          const innslag = data
            .filter((d) => d.registreringstidspunkt === id)
            .shift();

          return innslag ? (
            <div>
              <div className="detaljer__tittel">
                <Heading size={"small"} level={"2"}>
                  {innslag.institusjonsnavn}
                </Heading>
                {innslag.organisasjonsnummer && (
                  <BodyShort>
                    <FormattedMessage
                      id="side.organisasjonsnummer"
                      values={{
                        orgnr: formatOrgnr(
                          parseInt(
                            innslag.organisasjonsnummer,
                            RADIX_DECIMAL
                          ).toString()
                        ),
                      }}
                    />
                  </BodyShort>
                )}
              </div>
              <hr className="box__linje-bred" />
              <div className="box">
                <div className="box__content">
                  <ul className="list-column-2">
                    <ListElement
                      titleId={"inst.institusjonstype"}
                      content={innslag.institusjonstype}
                    />
                    <ListElement
                      titleId={"inst.periode"}
                      content={
                        <div className={"inst__periode"}>
                          {`${moment(innslag.startdato).format(
                            "DD.MM.YYYY"
                          )} - ${
                            innslag.faktiskSluttdato
                              ? moment(innslag.faktiskSluttdato).format(
                                  "DD.MM.YYYY"
                                )
                              : ``
                          }`}
                          {innslag.fiktivSluttdato && (
                            <CustomHelpText>
                              <FormattedMessage id={"inst.fiktivSluttdato"} />
                            </CustomHelpText>
                          )}
                        </div>
                      }
                    />
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <FormattedMessage id="inst.ingendata" />
            </div>
          );
        }}
      </WithInst>
      <div className="inst__kilde">
        <Kilde kilde="inst.kilde" lenkeType="INGEN" />
      </div>
    </PageContainer>
  );
};

export default InstDetaljer;
