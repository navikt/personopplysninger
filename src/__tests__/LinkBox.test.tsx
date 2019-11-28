import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import LinkBox from "pages/forside/sections/6-flere-opplysninger/linkbox/LinkBox";
import wrapIntl from "./__utils__/IntlTestHelper";
import pensjon from "assets/img/pensjon.svg";

test("render LinkBox with content", () => {
  const link = {
    id: "pensjonsopptjening",
    tittel: "eksternelenker.pensjon.tittel",
    beskrivelse: "eksternelenker.pensjon.beskrivelse",
    lenkeTekst: "eksternelenker.pensjon.lenkeTekst",
    url: "https://tjenester.nav.no/pselv/publisering/dinpensjon.jsf",
    icon: pensjon,
    visible: true
  };

  const component = ReactTestRenderer.create(
    wrapIntl(
      <LinkBox
        id={link.id}
        tittel={link.tittel}
        beskrivelse={link.beskrivelse}
        lenkeTekst={link.lenkeTekst}
        url={link.url}
        icon={link.icon}
      />
    )
  );
  expect(component.toJSON()).toMatchSnapshot();
});
