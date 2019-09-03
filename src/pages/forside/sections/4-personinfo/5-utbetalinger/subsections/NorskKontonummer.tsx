import React from "react";
import ListElement from "../../../../../../components/listelement/ListElement";

interface Props {
  kontonummer?: string;
}

const NorskKontonummer = ({ kontonummer }: Props) => {
  if (!kontonummer) {
    return null;
  }

  const formattertKontonr =
    kontonummer && kontonummer.length === 11
      ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3")
      : kontonummer;

  return (
    <ul className="list-column-2">
      <ListElement titleId="personalia.kontonr" content={formattertKontonr} />
    </ul>
  );
};

export default NorskKontonummer;
