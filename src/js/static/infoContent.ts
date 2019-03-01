interface IntoContent {
  personalia: {
    header: string;
    content: string;
  };
  adresse: {
    header: string;
    content: string;
  };
  dine_saker: {
    content: {
      __html: string;
    };
  };
  [key: string]: any;
}

const infoContent: IntoContent = {
  personalia: {
    header: "Personalia",
    content:
      "NAV må vite hvem du er og hvordan vi kan kontakte deg. Vi trenger også opplysninger for å kunne vurdere om du har krav på ytelser og tjenester fra NAV. For å kunne utbetale penger trenger vi kontonummeret ditt."
  },
  adresse: {
    header: "Adresse",
    content:
      "NAV må vite hvilken adresse vi kan kontakte deg på. Adressen din forteller også hvilket NAV-kontor du hører til."
  },
  dine_saker: {
    content: {
      __html:
        'Hvis du er part i en sak hos NAV, kan du få innsyn i sakens dokumenter i tjenesten Dine saker på nav.no. På grunn av tekniske og juridiske begrensninger vil ikke alle dokumenter vises. Du kan også be om partsinnsyn ved å kontakte NAV Kontaktsenter, tlf. 55 55 33 33, eller bruke <a href="" target="_blank" rel="noopener noreferrer">Send beskjed til NAV</a>.'
    }
  }
};

export default infoContent;
