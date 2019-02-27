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
    navn: "Pensjonsopptjening",
    href: "#pensjonsopptjening"
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
    href: "#cv"
  }
];

export const Filler = () => <div className="meny__filler" />;
export const Meny = () => (
  <div className="meny__wrapper">
    <div className="meny">
      <ul>
        {lenker.map(lenke => (
          <li key={lenke.href}>
            <Lenke href={lenke.href}>{lenke.navn}</Lenke>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
