import React from "react";
import { Link, BodyShort } from "@navikt/ds-react";

const lenker = [
  {
    navn: "Personalia",
    href: "#personalia",
  },
  {
    navn: "Adresse",
    href: "#adresse",
  },
  {
    navn: "Pensjonsopptjening",
    href: "#pensjonsopptjening",
  },
  {
    navn: "Dine saker",
    href: "#dine-saker",
  },
  {
    navn: "Utbetalinger",
    href: "#utbetalinger",
  },
  {
    navn: "Jobbsøk",
    href: "#cv",
  },
];

export const Filler = () => <div className="meny__filler" />;
export const Meny = () => (
  <div className="meny__wrapper">
    <div className="meny">
      <ul>
        {lenker.map((lenke) => (
          <li key={lenke.href}>
            <Link href={lenke.href}>
              <BodyShort>{lenke.navn}</BodyShort>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
