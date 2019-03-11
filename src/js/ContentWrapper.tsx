import React from "react";
import Header from "./components/Header";
import Personalia from "./components/Personalia";
import AdresseContainer from "./containers/AdresseContainer";
import LinksContainer from "./containers/LinksContainer";
import AlternativListe from "./components/AlternativListe";
import Brodsmulesti from "./components/Brodsmulesti";
import { PersonInfo } from "../types/personInfo";
import { formatName } from "./utils/text";

interface Props {
  personInfo: PersonInfo;
}

const ContentWrapper = ({ personInfo }: Props) => {
  const { personalia, adresser } = personInfo;
  return (
    <div className="Content">
      {personalia && (
        <>
          <Brodsmulesti />
          <Header fornavn={formatName(personalia.fornavn)} />
          <Personalia
            fornavn={formatName(personalia.fornavn)}
            etternavn={formatName(personalia.etternavn)}
            personident={personalia.personident}
            kontonr={personalia.kontonr}
            tlfnr={personalia.tlfnr}
            spraak={personalia.spraak}
            epostadr={personalia.epostadr}
            statsborgerskap={personalia.statsborgerskap}
            foedested={personalia.foedested}
            sivilstand={personalia.sivilstand}
            kjoenn={personalia.kjoenn}
          />
        </>
      )}
      {adresser && <AdresseContainer adresser={adresser} />}
      <LinksContainer />
      <AlternativListe />
    </div>
  );
};

export default ContentWrapper;
