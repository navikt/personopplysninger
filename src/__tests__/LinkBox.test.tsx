import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import LinkBox from "../js/components/LinkBox/LinkBox";
import wrapIntl from "../js/IntlTestHelper";

test("render LinkBox with content", () => {
  const link = {
    id: "pensjonsopptjening",
    header: "Pensjon",
    information: "NAV har opplysninger om din pensjon i en egen tjeneste.",
    linkText: "Gå til Din pensjon",
    url: "https://www.nav.no/no/Person/Pensjon/Hva+kan+jeg+fa+i+pensjon",
    kilde: "Pensjonsregisteret",
    infoBoxContent: {
      __html:
        'På grunn av tekniske og juridiske begrensninger vil ikke alle dokumenter vises. Du kan også be om partsinnsyn ved å kontakte NAV Kontaktsenter, tlf. 55 55 33 33, eller bruke <a class="lenke" href="" target="_blank" rel="noopener noreferrer">Send beskjed til NAV</a>.'
    }
  };

  const component = ReactTestRenderer.create(
    wrapIntl(
      <LinkBox
        id={link.id}
        header={link.header}
        information={link.information}
        url={link.url}
        linkText={link.linkText}
        kilde={link.kilde}
        infoBoxContent={link.infoBoxContent}
      />
    )
  );
  expect(component.toJSON()).toMatchSnapshot();
});
