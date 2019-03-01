import React from "react";
import Header from "./components/Header";
import Personalia from "./components/Personalia";
import AdresseContainer from "./containers/AdresseContainer";
import LinksContainer from "./containers/LinksContainer";
import AlternativListe from "./components/AlternativListe";
import { formatName } from "./utils/text";

const ContentWrapper = ({ personalia, adresser }: any) => (
  <div className="Content">
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
    <AdresseContainer adresseInfo={adresser} />
    <LinksContainer />
    <AlternativListe />
  </div>
);

export default ContentWrapper;
