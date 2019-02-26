import React from "react";
import Lenke from "nav-frontend-lenker";

const lenker = [
  {
    navn: "Personalia",
    href: "#personalia"
  },
  {
    navn: "Adresse",
    href: "#adresse"
  },
  {
    navn: "Arbeidsforhold",
    href: "#arbeidsforhold"
  },
  {
    navn: "Pensjonssparing",
    href: "#pensjonssparing"
  },
  {
    navn: "Dine saker",
    href: "#dine-saker"
  },
  {
    navn: "Utbetalinger",
    href: "#utbetalinger"
  },
  {
    navn: "Jobbsøk",
    href: "#jobb-sok"
  }
];

export const Filler = () => <div className="meny-filler" />;
export const Meny = () => (
  <div className="meny-wrapper">
    <div className="meny">
      <ul>
        {lenker.map(lenke => (
          <li>
            <Lenke href={lenke.href}>{lenke.navn}</Lenke>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
