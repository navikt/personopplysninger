import React from "react";
import Box from "components/box/Box";
import personaliaIkon from "assets/img/Personalia.svg";
import { Personalia as PersonaliaType } from "types/personalia";
import ListElement from "components/listelement/ListElement";
import Kilde from "components/kilde/Kilde";
import eksternLenkeIkon from "assets/img/Link.svg";
import { useStore } from "../../../../../store/Context";

interface Props {
  personalia: PersonaliaType;
}

const Personalia = (props: Props) => {
  const [{ locale }] = useStore();

  const {
    personident,
    fornavn,
    etternavn,
    spraak,
    statsborgerskap,
    foedested,
    sivilstand,
    kjoenn,
  } = props.personalia;

  const personidentHeader =
    personident && personident.type === "DNR"
      ? "personalia.dnr"
      : "personalia.fnr";

  const fornavnHeader =
    fornavn && fornavn.indexOf(" ") === -1
      ? "personalia.first_name"
      : "personalia.first_and_middle_name";

  const formattertPersonident =
    personident && personident.verdi.length === 11
      ? {
          ...personident,
          verdi: personident.verdi.replace(/^(.{6})(.*)$/, "$1 $2"),
        }
      : personident;

  return (
    <Box
      id="personalia"
      tittel="personalia.tittel"
      beskrivelse="personalia.beskrivelse"
      icon={personaliaIkon}
      visAnkerlenke={true}
    >
      <ul className="list-column-2">
        <ListElement titleId={fornavnHeader} content={fornavn} />
        <ListElement
          className="capitalize"
          titleId="personalia.surname"
          content={etternavn}
        />
        {formattertPersonident && (
          <ListElement
            titleId={personidentHeader}
            content={formattertPersonident.verdi}
          />
        )}
        <ListElement titleId="personalia.language" content={spraak} />
        {statsborgerskap && (
          <ListElement
            titleId="personalia.citizenship"
            content={
              <>
                {statsborgerskap?.map((i, key) => {
                  return <div key={key}>{i}</div>;
                })}
              </>
            }
          />
        )}
        <ListElement titleId="personalia.birthplace" content={foedested} />
        <ListElement titleId="personalia.civil_status" content={sivilstand} />
        <ListElement titleId="personalia.gender" content={kjoenn} />
      </ul>
      <Kilde
        kilde="personalia.source.folkeregisteret"
        lenke={
          locale === "en"
            ? "https://www.skatteetaten.no/en/person/national-registry/"
            : "https://www.skatteetaten.no/person/folkeregister/"
        }
        lenkeTekst="personalia.link.folkeregisteret"
        lenkeType={"EKSTERN"}
        ikon={eksternLenkeIkon}
      />
    </Box>
  );
};

export default Personalia;
