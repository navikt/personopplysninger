import React from "react";
import ListElement from "components/listelement/ListElement";
import { formatterKontonr } from "../utils";

interface Props {
  kontonummer?: string;
}

const NorskKontonummer = ({ kontonummer }: Props) => {
  return kontonummer ? (
    <dl className="list-column-2">
      <ListElement
        titleId="personalia.kontonr"
        content={formatterKontonr(kontonummer)}
      />
    </dl>
  ) : null;
};

export default NorskKontonummer;
