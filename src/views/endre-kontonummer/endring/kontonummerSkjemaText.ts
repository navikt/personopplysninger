export const text = {
    bankensAdresseLabel: {
        nb: "Bankens adresse",
        nn: "Bankens adresse",
        en: "Bank address",
    },
    kontonummerLabel: {
        nb: "Kontonummer",
        nn: "Kontonummer",
        en: "Account number",
    },
    kontonummerValg: {
        nb: "Velg norsk eller utenlandsk kontonummer",
        nn: "Velg norsk eller utenlandsk kontonummer",
        en: "Choose Norwegian or foreign account number",
    },
    norskKontonummer: {
        nb: "Norsk kontonummer",
        nn: "Norsk kontonummer",
        en: "Norwegian account number",
    },
    utenlandskKontonummer: {
        nb: "Utenlandsk kontonummer",
        nn: "Utanlandsk kontonummer",
        en: "Foreign account number",
    },
    utenlandskKontoInfoFoer: {
        nb: "Vær nøye med utfylling av bankinformasjon for utenlandsk konto slik at betalingen kommer frem til riktig sted. Nav er ikke ansvarlig for at opplysningene er riktige. Gebyrer kan påløpe. Les mer om krav til ",
        nn: "Ver nøye med utfylling av bankinformasjon for utanlandsk konto slik at betalinga kjem fram til rett stad. Nav er ikkje ansvarleg for at opplysningane er rette. Det kan vere gebyr. Les meir om krav til ",
        en: "Be careful when you fill in bank information for foreign accounts so that the payment arrives at the correct location. Nav is not responsible for ensuring that the information is correct. Fees may apply. Read more about requirements for ",
    },
    utenlandskKontoInfoLenke: {
        nb: " utenlandsk kontonummer ",
        nn: " utanlandsk kontonummer ",
        en: " foreign account numbers ",
    },
    utenlandskKontoInfoEtter: {
        nb: ".",
        nn: ".",
        en: ".",
    },
    kontonummerIbanLabel: {
        nb: "Kontonummer / IBAN",
        nn: "Kontonummer / IBAN",
        en: "Account number / IBAN",
    },
    bicLabel: {
        nb: "BIC / Swift-kode",
        nn: "BIC / Swift-kode",
        en: "BIC / SWIFT code",
    },
    bankensLandLabel: {
        nb: "Bankens land",
        nn: "Bankens land",
        en: "Country of bank",
    },
    valutaLabel: {
        nb: "Valuta",
        nn: "Valuta",
        en: "Currency",
    },
    bankkodeLabel: {
        nb: "Bankkode",
        nn: "Bankkode",
        en: "Bank code",
    },
    banknavnLabel: {
        nb: "Bankens navn",
        nn: "Bankens namn",
        en: "Name of bank",
    },
    bankkodeAdvarselFoer: {
        nb: "For ",
        nn: "For ",
        en: "For ",
    },
    bankkodeAdvarselEtter: {
        nb: " kan du oppgi både BIC/Swift-kode og bankkode. Du kan oppgi begge, men det er tilstrekkelig med en av kodene.",
        nn: " kan du oppgi både BIC/Swift-kode og bankkode. Du kan oppgi begge, men det er tilstrekkeleg med ei av kodene.",
        en: " you can provide both BIC/SWIFT code and bank code. You can provide both, but one code is sufficient.",
    },
    authInfo: {
        nb: "Du blir bedt om å logge inn på nytt for å bekrefte endringen.",
        nn: "Du vert beden om å logge inn på nytt for å bekrefte endringa.",
        en: "You will be asked to log in again to confirm the change.",
    },
    kunTall: {
        nb: "Skriv bare tall",
        nn: "Berre skriv tal",
        en: "Enter only numbers",
    },
    kunBokstaverOgTall: {
        nb: "Skriv bare bokstaver og tall",
        nn: "Berre skriv bokstaver og tal",
        en: "Enter only letters and numbers",
    },
    landPaakrevd: {
        nb: "Land er nødvendig",
        nn: "Land er nødvendig",
        en: "Country is required",
    },
    kontonummerPaakrevd: {
        nb: "Kontonummer er nødvendig",
        nn: "Kontonummer er nødvendig",
        en: "Account number is required",
    },
    kontonummerElleve: {
        nb: "Norske kontonummer må ha 11 tall",
        nn: "Norske kontonummer må ha 11 tal",
        en: "Norwegian account numbers must have 11 numbers",
    },
    kontonummerMod11: {
        nb: "Skriv inn et gyldig kontonummer",
        nn: "Skriv inn eit gyldig kontonummer",
        en: "Enter a valid account number",
    },
    kontonummerIdnr: {
        nb: "Kontonummer kan ikke være et fødselsnummer eller d-nummer.",
        nn: "Kontonummer kan ikkje være eit fødselsnummer eller d-nummer.",
        en: "Account number cannot be a national identity number or D-number.",
    },
    ikkeIban: {
        nb: "Amerikanske kontonummer kan ikke være IBAN",
        nn: "Amerikanske kontonummer kan ikkje være IBAN",
        en: "US account numbers cannot be IBAN",
    },
    ibanPaakrevd: {
        nb: "IBAN er nødvendig",
        nn: "IBAN er nødvendig",
        en: "IBAN is required",
    },
    ibanGyldig: {
        nb: "Gyldig IBAN er nødvendig",
        nn: "Gyldig IBAN er nødvendig",
        en: "Valid IBAN is required",
    },
    ibanLand: {
        nb: "Du må taste inn et IBAN-nummer fra det landet du har valgt.",
        nn: "Du må taste inn et IBAN-nummer frå det landet du har valt.",
        en: "You must enter an IBAN number from the country you have selected.",
    },
    banknavnPaakrevd: {
        nb: "Banknavn er nødvendig",
        nn: "Bandnamn er nødvendig",
        en: "Bank name is required",
    },
    banknavnUgyldig: {
        nb: "Inneholder ugyldige tegn",
        nn: "Inneheld ugyldige teikn",
        en: "Contains invalid characters",
    },
    bankkodePaakrevd: {
        nb: "Bankkode er nødvendig",
        nn: "Bankkode er nødvendig",
        en: "Bank code required",
    },
    bankkodeLengde: {
        nb: (land: string, siffer: number | string) => `Bankkoder fra ${land} må ha ${siffer} tall`,
        nn: (land: string, siffer: number | string) => `Bankkoder frå ${land} må ha ${siffer} tal`,
        en: (land: string, siffer: number | string) => `Bank codes from ${land} must have ${siffer} numbers`,
    },
    bicPaakrevd: {
        nb: "BIC / Swift-kode er nødvendig",
        nn: "BIC / Swift-kode er nødvendig",
        en: "BIC / SWIFT-code is required",
    },
    bicGyldig: {
        nb: "Gyldig BIC / Swift-kode er nødvendig",
        nn: "Gyldig BIC / Swift-kode er nødvendig",
        en: "Valid BIC / SWIFT code is required",
    },
    bicLand: {
        nb: "Du må taste inn en gyldig BIC / Swift-kode fra det landet du har valgt.",
        nn: "Du må taste inn en gyldig BIC / Swift-kode frå det landet du har valt.",
        en: "You must enter a valid BIC / SWIFT code from the country you have selected.",
    },
    valutaPaakrevd: {
        nb: "Valuta er nødvendig",
        nn: "Valuta er nødvendig",
        en: "Currency is required",
    },
    adressePaakrevd: {
        nb: "Første adresselinje er nødvendig",
        nn: "Første adresselinje er nødvendig",
        en: "Address is required",
    },
    adresselinjePaakrevd: {
        nb: "Nødvendig når feltet under er utfylt",
        nn: "Nødvendig når feltet under er utfylt",
        en: "Required when the field below is filled in",
    },
    adresselinjeUgyldig: {
        nb: "Inneholder ugyldige tegn",
        nn: "Inneheld ugyldige teikn",
        en: "Contains invalid characters",
    },
    svarteliste: {
        nb: "Kan ikke inneholde ord som «ukjent», «ikke kjent», «vet ikke», «uoppgitt», «n.n.», «nomen nescio»",
        nn: "Kan ikkje innehalde ord som «ukjent», «ikkje kjent», «veit ikkje», «uoppgitt», «n.n.», «nomen nescio»",
        en: "Cannot contain words such as «ukjent», «ikke kjent», «vet ikke», «uoppgitt», «n.n.», «nomen nescio»",
    },
    foersteTegnMellomrom: {
        nb: "Første bokstav kan ikke være mellomrom",
        nn: "Første bokstav kan ikkje være mellomrom",
        en: "The first letter cannot be a space",
    },
    flereMellomrom: {
        nb: "Kan ikke ha flere sammenhengende mellomrom",
        nn: "Kan ikkje ha fleire samanhengande mellomrom",
        en: "Cannot have multiple contiguous spaces",
    },
    kunMellomromTegnSifre: {
        nb: "Kan ikke bestå av kun space, spesialtegn og/eller sifre",
        nn: "Kan ikkje bestå av berre space, spesialteikn og/eller sifre",
        en: "Cannot consist of space, special characters and / or numbers only",
    },
    kunMellomromTegn: {
        nb: "Kan ikke bestå av kun space og/eller spesialtegn",
        nn: "Kan ikkje bestå av berre space og/eller spesialteikn",
        en: "Cannot consist of space and / or special characters only",
    },
    rettOpp: {
        nb: "For å gå videre må du rette opp følgende:",
        nn: "For å gå videre må du rette opp følgande:",
        en: "To proceed, you must correct the following:",
    },
};
