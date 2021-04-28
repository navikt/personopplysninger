interface EnkeltLand {
  alpha2: string;
  isEurope: boolean;
  ibanPrefixAlternatives?: string[];
}

export const LandOppslag = new Map<string, EnkeltLand>([
  [
    "AFG",
    {
      alpha2: "AF",
      isEurope: false,
    },
  ],
  [
    "ALA",
    {
      alpha2: "AX",
      isEurope: false,
    },
  ],
  [
    "ALB",
    {
      alpha2: "AL",
      isEurope: true,
    },
  ],
  [
    "DZA",
    {
      alpha2: "DZ",
      isEurope: false,
    },
  ],
  [
    "ASM",
    {
      alpha2: "AS",
      isEurope: false,
    },
  ],
  [
    "AND",
    {
      alpha2: "AD",
      isEurope: true,
    },
  ],
  [
    "AGO",
    {
      alpha2: "AO",
      isEurope: false,
    },
  ],
  [
    "AIA",
    {
      alpha2: "AI",
      isEurope: false,
    },
  ],
  [
    "ATA",
    {
      alpha2: "AQ",
      isEurope: false,
    },
  ],
  [
    "ATG",
    {
      alpha2: "AG",
      isEurope: false,
    },
  ],
  [
    "ARG",
    {
      alpha2: "AR",
      isEurope: false,
    },
  ],
  [
    "ARM",
    {
      alpha2: "AM",
      isEurope: true,
    },
  ],
  [
    "ABW",
    {
      alpha2: "AW",
      isEurope: false,
    },
  ],
  [
    "AUS",
    {
      alpha2: "AU",
      isEurope: false,
    },
  ],
  [
    "AUT",
    {
      alpha2: "AT",
      isEurope: true,
    },
  ],
  [
    "AZE",
    {
      alpha2: "AZ",
      isEurope: true,
    },
  ],
  [
    "BHS",
    {
      alpha2: "BS",
      isEurope: false,
    },
  ],
  [
    "BHR",
    {
      alpha2: "BH",
      isEurope: false,
    },
  ],
  [
    "BGD",
    {
      alpha2: "BD",
      isEurope: false,
    },
  ],
  [
    "BRB",
    {
      alpha2: "BB",
      isEurope: false,
    },
  ],
  [
    "BLR",
    {
      alpha2: "BY",
      isEurope: true,
    },
  ],
  [
    "BEL",
    {
      alpha2: "BE",
      isEurope: true,
    },
  ],
  [
    "BLZ",
    {
      alpha2: "BZ",
      isEurope: false,
    },
  ],
  [
    "BEN",
    {
      alpha2: "BJ",
      isEurope: false,
    },
  ],
  [
    "BMU",
    {
      alpha2: "BM",
      isEurope: false,
    },
  ],
  [
    "BTN",
    {
      alpha2: "BT",
      isEurope: false,
    },
  ],
  [
    "BOL",
    {
      alpha2: "BO",
      isEurope: false,
    },
  ],
  [
    "BIH",
    {
      alpha2: "BA",
      isEurope: true,
    },
  ],
  [
    "BWA",
    {
      alpha2: "BW",
      isEurope: false,
    },
  ],
  [
    "BVT",
    {
      alpha2: "BV",
      isEurope: false,
    },
  ],
  [
    "BRA",
    {
      alpha2: "BR",
      isEurope: false,
    },
  ],
  [
    "VGB",
    {
      alpha2: "VG",
      isEurope: false,
    },
  ],
  [
    "IOT",
    {
      alpha2: "IO",
      isEurope: false,
    },
  ],
  [
    "BRN",
    {
      alpha2: "BN",
      isEurope: false,
    },
  ],
  [
    "BGR",
    {
      alpha2: "BG",
      isEurope: true,
    },
  ],
  [
    "BFA",
    {
      alpha2: "BF",
      isEurope: false,
    },
  ],
  [
    "BDI",
    {
      alpha2: "BI",
      isEurope: false,
    },
  ],
  [
    "KHM",
    {
      alpha2: "KH",
      isEurope: false,
    },
  ],
  [
    "CMR",
    {
      alpha2: "CM",
      isEurope: false,
    },
  ],
  [
    "CAN",
    {
      alpha2: "CA",
      isEurope: false,
    },
  ],
  [
    "CPV",
    {
      alpha2: "CV",
      isEurope: false,
    },
  ],
  [
    "CYM",
    {
      alpha2: "KY",
      isEurope: false,
    },
  ],
  [
    "CAF",
    {
      alpha2: "CF",
      isEurope: false,
    },
  ],
  [
    "TCD",
    {
      alpha2: "TD",
      isEurope: false,
    },
  ],
  [
    "CHL",
    {
      alpha2: "CL",
      isEurope: false,
    },
  ],
  [
    "CHN",
    {
      alpha2: "CN",
      isEurope: false,
    },
  ],
  [
    "HKG",
    {
      alpha2: "HK",
      isEurope: false,
    },
  ],
  [
    "MAC",
    {
      alpha2: "MO",
      isEurope: false,
    },
  ],
  [
    "CXR",
    {
      alpha2: "CX",
      isEurope: false,
    },
  ],
  [
    "CCK",
    {
      alpha2: "CC",
      isEurope: false,
    },
  ],
  [
    "COL",
    {
      alpha2: "CO",
      isEurope: false,
    },
  ],
  [
    "COM",
    {
      alpha2: "KM",
      isEurope: false,
    },
  ],
  [
    "COG",
    {
      alpha2: "CG",
      isEurope: false,
    },
  ],
  [
    "COD",
    {
      alpha2: "CD",
      isEurope: false,
    },
  ],
  [
    "COK",
    {
      alpha2: "CK",
      isEurope: false,
    },
  ],
  [
    "CRI",
    {
      alpha2: "CR",
      isEurope: false,
    },
  ],
  [
    "CIV",
    {
      alpha2: "CI",
      isEurope: false,
    },
  ],
  [
    "HRV",
    {
      alpha2: "HR",
      isEurope: true,
    },
  ],
  [
    "CUB",
    {
      alpha2: "CU",
      isEurope: false,
    },
  ],
  [
    "CYP",
    {
      alpha2: "CY",
      isEurope: true,
    },
  ],
  [
    "CZE",
    {
      alpha2: "CZ",
      isEurope: true,
    },
  ],
  [
    "DNK",
    {
      alpha2: "DK",
      isEurope: true,
    },
  ],
  [
    "DJI",
    {
      alpha2: "DJ",
      isEurope: false,
    },
  ],
  [
    "DMA",
    {
      alpha2: "DM",
      isEurope: false,
    },
  ],
  [
    "DOM",
    {
      alpha2: "DO",
      isEurope: false,
    },
  ],
  [
    "ECU",
    {
      alpha2: "EC",
      isEurope: false,
    },
  ],
  [
    "EGY",
    {
      alpha2: "EG",
      isEurope: false,
    },
  ],
  [
    "SLV",
    {
      alpha2: "SV",
      isEurope: false,
    },
  ],
  [
    "GNQ",
    {
      alpha2: "GQ",
      isEurope: false,
    },
  ],
  [
    "ERI",
    {
      alpha2: "ER",
      isEurope: false,
    },
  ],
  [
    "EST",
    {
      alpha2: "EE",
      isEurope: true,
    },
  ],
  [
    "ETH",
    {
      alpha2: "ET",
      isEurope: false,
    },
  ],
  [
    "FLK",
    {
      alpha2: "FK",
      isEurope: false,
    },
  ],
  [
    "FRO",
    {
      alpha2: "FO",
      isEurope: true,
    },
  ],
  [
    "FJI",
    {
      alpha2: "FJ",
      isEurope: false,
    },
  ],
  [
    "FIN",
    {
      alpha2: "FI",
      isEurope: true,
    },
  ],
  [
    "FRA",
    {
      alpha2: "FR",
      isEurope: true,
    },
  ],
  [
    "GUF",
    {
      alpha2: "GF",
      isEurope: false,
    },
  ],
  [
    "PYF",
    {
      alpha2: "PF",
      isEurope: false,
    },
  ],
  [
    "ATF",
    {
      alpha2: "TF",
      isEurope: false,
    },
  ],
  [
    "GAB",
    {
      alpha2: "GA",
      isEurope: false,
    },
  ],
  [
    "GMB",
    {
      alpha2: "GM",
      isEurope: false,
    },
  ],
  [
    "GEO",
    {
      alpha2: "GE",
      isEurope: false,
    },
  ],
  [
    "DEU",
    {
      alpha2: "DE",
      isEurope: true,
    },
  ],
  [
    "GHA",
    {
      alpha2: "GH",
      isEurope: false,
    },
  ],
  [
    "GIB",
    {
      alpha2: "GI",
      isEurope: true,
    },
  ],
  [
    "GRC",
    {
      alpha2: "GR",
      isEurope: true,
    },
  ],
  [
    "GRL",
    {
      alpha2: "GL",
      isEurope: false,
    },
  ],
  [
    "GRD",
    {
      alpha2: "GD",
      isEurope: false,
    },
  ],
  [
    "GLP",
    {
      alpha2: "GP",
      isEurope: false,
    },
  ],
  [
    "GUM",
    {
      alpha2: "GU",
      isEurope: false,
    },
  ],
  [
    "GTM",
    {
      alpha2: "GT",
      isEurope: false,
    },
  ],
  [
    "GGY",
    {
      alpha2: "GG",
      ibanPrefixAlternatives: ["GB"],
      isEurope: true,
    },
  ],
  [
    "GIN",
    {
      alpha2: "GN",
      isEurope: false,
    },
  ],
  [
    "GNB",
    {
      alpha2: "GW",
      isEurope: false,
    },
  ],
  [
    "GUY",
    {
      alpha2: "GY",
      isEurope: false,
    },
  ],
  [
    "HTI",
    {
      alpha2: "HT",
      isEurope: false,
    },
  ],
  [
    "HMD",
    {
      alpha2: "HM",
      isEurope: false,
    },
  ],
  [
    "VAT",
    {
      alpha2: "VA",
      isEurope: true,
    },
  ],
  [
    "HND",
    {
      alpha2: "HN",
      isEurope: false,
    },
  ],
  [
    "HUN",
    {
      alpha2: "HU",
      isEurope: true,
    },
  ],
  [
    "ISL",
    {
      alpha2: "IS",
      isEurope: true,
    },
  ],
  [
    "IND",
    {
      alpha2: "IN",
      isEurope: false,
    },
  ],
  [
    "IDN",
    {
      alpha2: "ID",
      isEurope: false,
    },
  ],
  [
    "IRN",
    {
      alpha2: "IR",
      isEurope: false,
    },
  ],
  [
    "IRQ",
    {
      alpha2: "IQ",
      isEurope: false,
    },
  ],
  [
    "IRL",
    {
      alpha2: "IE",
      isEurope: true,
    },
  ],
  [
    "IMN",
    {
      alpha2: "IM",
      ibanPrefixAlternatives: ["GB"],
      isEurope: true,
    },
  ],
  [
    "ISR",
    {
      alpha2: "IL",
      isEurope: false,
    },
  ],
  [
    "ITA",
    {
      alpha2: "IT",
      isEurope: true,
    },
  ],
  [
    "JAM",
    {
      alpha2: "JM",
      isEurope: false,
    },
  ],
  [
    "JPN",
    {
      alpha2: "JP",
      isEurope: false,
    },
  ],
  [
    "JEY",
    {
      alpha2: "JE",
      ibanPrefixAlternatives: ["GB"],
      isEurope: true,
    },
  ],
  [
    "JOR",
    {
      alpha2: "JO",
      isEurope: false,
    },
  ],
  [
    "KAZ",
    {
      alpha2: "KZ",
      isEurope: true,
    },
  ],
  [
    "KEN",
    {
      alpha2: "KE",
      isEurope: false,
    },
  ],
  [
    "KIR",
    {
      alpha2: "KI",
      isEurope: false,
    },
  ],
  [
    "PRK",
    {
      alpha2: "KP",
      isEurope: false,
    },
  ],
  [
    "KOR",
    {
      alpha2: "KR",
      isEurope: false,
    },
  ],
  [
    "KWT",
    {
      alpha2: "KW",
      isEurope: false,
    },
  ],
  [
    "KGZ",
    {
      alpha2: "KG",
      isEurope: false,
    },
  ],
  [
    "LAO",
    {
      alpha2: "LA",
      isEurope: false,
    },
  ],
  [
    "LVA",
    {
      alpha2: "LV",
      isEurope: true,
    },
  ],
  [
    "LBN",
    {
      alpha2: "LB",
      isEurope: false,
    },
  ],
  [
    "LSO",
    {
      alpha2: "LS",
      isEurope: false,
    },
  ],
  [
    "LBR",
    {
      alpha2: "LR",
      isEurope: false,
    },
  ],
  [
    "LBY",
    {
      alpha2: "LY",
      isEurope: false,
    },
  ],
  [
    "LIE",
    {
      alpha2: "LI",
      isEurope: true,
    },
  ],
  [
    "LTU",
    {
      alpha2: "LT",
      isEurope: true,
    },
  ],
  [
    "LUX",
    {
      alpha2: "LU",
      isEurope: true,
    },
  ],
  [
    "MKD",
    {
      alpha2: "MK",
      isEurope: true,
    },
  ],
  [
    "MDG",
    {
      alpha2: "MG",
      isEurope: false,
    },
  ],
  [
    "MWI",
    {
      alpha2: "MW",
      isEurope: false,
    },
  ],
  [
    "MYS",
    {
      alpha2: "MY",
      isEurope: false,
    },
  ],
  [
    "MDV",
    {
      alpha2: "MV",
      isEurope: false,
    },
  ],
  [
    "MLI",
    {
      alpha2: "ML",
      isEurope: false,
    },
  ],
  [
    "MLT",
    {
      alpha2: "MT",
      isEurope: true,
    },
  ],
  [
    "MHL",
    {
      alpha2: "MH",
      isEurope: false,
    },
  ],
  [
    "MTQ",
    {
      alpha2: "MQ",
      isEurope: false,
    },
  ],
  [
    "MRT",
    {
      alpha2: "MR",
      isEurope: false,
    },
  ],
  [
    "MUS",
    {
      alpha2: "MU",
      isEurope: false,
    },
  ],
  [
    "MYT",
    {
      alpha2: "YT",
      isEurope: false,
    },
  ],
  [
    "MEX",
    {
      alpha2: "MX",
      isEurope: false,
    },
  ],
  [
    "FSM",
    {
      alpha2: "FM",
      isEurope: false,
    },
  ],
  [
    "MDA",
    {
      alpha2: "MD",
      isEurope: true,
    },
  ],
  [
    "MCO",
    {
      alpha2: "MC",
      isEurope: true,
    },
  ],
  [
    "MNG",
    {
      alpha2: "MN",
      isEurope: false,
    },
  ],
  [
    "MNE",
    {
      alpha2: "ME",
      isEurope: true,
    },
  ],
  [
    "MSR",
    {
      alpha2: "MS",
      isEurope: false,
    },
  ],
  [
    "MAR",
    {
      alpha2: "MA",
      isEurope: false,
    },
  ],
  [
    "MOZ",
    {
      alpha2: "MZ",
      isEurope: false,
    },
  ],
  [
    "MMR",
    {
      alpha2: "MM",
      isEurope: false,
    },
  ],
  [
    "NAM",
    {
      alpha2: "NA",
      isEurope: false,
    },
  ],
  [
    "NRU",
    {
      alpha2: "NR",
      isEurope: false,
    },
  ],
  [
    "NPL",
    {
      alpha2: "NP",
      isEurope: false,
    },
  ],
  [
    "NLD",
    {
      alpha2: "NL",
      isEurope: true,
    },
  ],
  [
    "ANT",
    {
      alpha2: "AN",
      isEurope: false,
    },
  ],
  [
    "NCL",
    {
      alpha2: "NC",
      isEurope: false,
    },
  ],
  [
    "NZL",
    {
      alpha2: "NZ",
      isEurope: false,
    },
  ],
  [
    "NIC",
    {
      alpha2: "NI",
      isEurope: false,
    },
  ],
  [
    "NER",
    {
      alpha2: "NE",
      isEurope: false,
    },
  ],
  [
    "NGA",
    {
      alpha2: "NG",
      isEurope: false,
    },
  ],
  [
    "NIU",
    {
      alpha2: "NU",
      isEurope: false,
    },
  ],
  [
    "NFK",
    {
      alpha2: "NF",
      isEurope: false,
    },
  ],
  [
    "MNP",
    {
      alpha2: "MP",
      isEurope: false,
    },
  ],
  [
    "NOR",
    {
      alpha2: "NO",
      isEurope: true,
    },
  ],
  [
    "OMN",
    {
      alpha2: "OM",
      isEurope: false,
    },
  ],
  [
    "PAK",
    {
      alpha2: "PK",
      isEurope: false,
    },
  ],
  [
    "PLW",
    {
      alpha2: "PW",
      isEurope: false,
    },
  ],
  [
    "PSE",
    {
      alpha2: "PS",
      isEurope: false,
    },
  ],
  [
    "PAN",
    {
      alpha2: "PA",
      isEurope: false,
    },
  ],
  [
    "PNG",
    {
      alpha2: "PG",
      isEurope: false,
    },
  ],
  [
    "PRY",
    {
      alpha2: "PY",
      isEurope: false,
    },
  ],
  [
    "PER",
    {
      alpha2: "PE",
      isEurope: false,
    },
  ],
  [
    "PHL",
    {
      alpha2: "PH",
      isEurope: false,
    },
  ],
  [
    "PCN",
    {
      alpha2: "PN",
      isEurope: false,
    },
  ],
  [
    "POL",
    {
      alpha2: "PL",
      isEurope: true,
    },
  ],
  [
    "PRT",
    {
      alpha2: "PT",
      isEurope: true,
    },
  ],
  [
    "PRI",
    {
      alpha2: "PR",
      isEurope: false,
    },
  ],
  [
    "QAT",
    {
      alpha2: "QA",
      isEurope: false,
    },
  ],
  [
    "REU",
    {
      alpha2: "RE",
      isEurope: false,
    },
  ],
  [
    "ROU",
    {
      alpha2: "RO",
      isEurope: true,
    },
  ],
  [
    "RUS",
    {
      alpha2: "RU",
      isEurope: true,
    },
  ],
  [
    "RWA",
    {
      alpha2: "RW",
      isEurope: false,
    },
  ],
  [
    "BLM",
    {
      alpha2: "BL",
      isEurope: false,
    },
  ],
  [
    "SHN",
    {
      alpha2: "SH",
      isEurope: false,
    },
  ],
  [
    "KNA",
    {
      alpha2: "KN",
      isEurope: false,
    },
  ],
  [
    "LCA",
    {
      alpha2: "LC",
      isEurope: false,
    },
  ],
  [
    "MAF",
    {
      alpha2: "MF",
      isEurope: false,
    },
  ],
  [
    "SPM",
    {
      alpha2: "PM",
      isEurope: false,
    },
  ],
  [
    "VCT",
    {
      alpha2: "VC",
      isEurope: false,
    },
  ],
  [
    "WSM",
    {
      alpha2: "WS",
      isEurope: false,
    },
  ],
  [
    "SMR",
    {
      alpha2: "SM",
      isEurope: true,
    },
  ],
  [
    "STP",
    {
      alpha2: "ST",
      isEurope: false,
    },
  ],
  [
    "SAU",
    {
      alpha2: "SA",
      isEurope: false,
    },
  ],
  [
    "SEN",
    {
      alpha2: "SN",
      isEurope: false,
    },
  ],
  [
    "SRB",
    {
      alpha2: "RS",
      isEurope: true,
    },
  ],
  [
    "SYC",
    {
      alpha2: "SC",
      isEurope: false,
    },
  ],
  [
    "SLE",
    {
      alpha2: "SL",
      isEurope: false,
    },
  ],
  [
    "SGP",
    {
      alpha2: "SG",
      isEurope: false,
    },
  ],
  [
    "SVK",
    {
      alpha2: "SK",
      isEurope: true,
    },
  ],
  [
    "SVN",
    {
      alpha2: "SI",
      isEurope: true,
    },
  ],
  [
    "SLB",
    {
      alpha2: "SB",
      isEurope: false,
    },
  ],
  [
    "SOM",
    {
      alpha2: "SO",
      isEurope: false,
    },
  ],
  [
    "ZAF",
    {
      alpha2: "ZA",
      isEurope: false,
    },
  ],
  [
    "SGS",
    {
      alpha2: "GS",
      isEurope: false,
    },
  ],
  [
    "SSD",
    {
      alpha2: "SS",
      isEurope: false,
    },
  ],
  [
    "ESP",
    {
      alpha2: "ES",
      isEurope: true,
    },
  ],
  [
    "LKA",
    {
      alpha2: "LK",
      isEurope: false,
    },
  ],
  [
    "SDN",
    {
      alpha2: "SD",
      isEurope: false,
    },
  ],
  [
    "SUR",
    {
      alpha2: "SR",
      isEurope: false,
    },
  ],
  [
    "SJM",
    {
      alpha2: "SJ",
      isEurope: true,
    },
  ],
  [
    "SWZ",
    {
      alpha2: "SZ",
      isEurope: false,
    },
  ],
  [
    "SWE",
    {
      alpha2: "SE",
      isEurope: true,
    },
  ],
  [
    "CHE",
    {
      alpha2: "CH",
      isEurope: true,
    },
  ],
  [
    "SYR",
    {
      alpha2: "SY",
      isEurope: false,
    },
  ],
  [
    "TWN",
    {
      alpha2: "TW",
      isEurope: false,
    },
  ],
  [
    "TJK",
    {
      alpha2: "TJ",
      isEurope: false,
    },
  ],
  [
    "TZA",
    {
      alpha2: "TZ",
      isEurope: false,
    },
  ],
  [
    "THA",
    {
      alpha2: "TH",
      isEurope: false,
    },
  ],
  [
    "TLS",
    {
      alpha2: "TL",
      isEurope: false,
    },
  ],
  [
    "TGO",
    {
      alpha2: "TG",
      isEurope: false,
    },
  ],
  [
    "TKL",
    {
      alpha2: "TK",
      isEurope: false,
    },
  ],
  [
    "TON",
    {
      alpha2: "TO",
      isEurope: false,
    },
  ],
  [
    "TTO",
    {
      alpha2: "TT",
      isEurope: false,
    },
  ],
  [
    "TUN",
    {
      alpha2: "TN",
      isEurope: false,
    },
  ],
  [
    "TUR",
    {
      alpha2: "TR",
      isEurope: true,
    },
  ],
  [
    "TKM",
    {
      alpha2: "TM",
      isEurope: false,
    },
  ],
  [
    "TCA",
    {
      alpha2: "TC",
      isEurope: false,
    },
  ],
  [
    "TUV",
    {
      alpha2: "TV",
      isEurope: false,
    },
  ],
  [
    "UGA",
    {
      alpha2: "UG",
      isEurope: false,
    },
  ],
  [
    "UKR",
    {
      alpha2: "UA",
      isEurope: true,
    },
  ],
  [
    "ARE",
    {
      alpha2: "AE",
      isEurope: false,
    },
  ],
  [
    "GBR",
    {
      alpha2: "GB",
      isEurope: true,
    },
  ],
  [
    "USA",
    {
      alpha2: "US",
      isEurope: false,
    },
  ],
  [
    "UMI",
    {
      alpha2: "UM",
      isEurope: false,
    },
  ],
  [
    "URY",
    {
      alpha2: "UY",
      isEurope: false,
    },
  ],
  [
    "UZB",
    {
      alpha2: "UZ",
      isEurope: false,
    },
  ],
  [
    "VUT",
    {
      alpha2: "VU",
      isEurope: false,
    },
  ],
  [
    "VEN",
    {
      alpha2: "VE",
      isEurope: false,
    },
  ],
  [
    "VNM",
    {
      alpha2: "VN",
      isEurope: false,
    },
  ],
  [
    "VIR",
    {
      alpha2: "VI",
      isEurope: false,
    },
  ],
  [
    "WLF",
    {
      alpha2: "WF",
      isEurope: false,
    },
  ],
  [
    "ESH",
    {
      alpha2: "EH",
      isEurope: false,
    },
  ],
  [
    "YEM",
    {
      alpha2: "YE",
      isEurope: false,
    },
  ],
  [
    "ZMB",
    {
      alpha2: "ZM",
      isEurope: false,
    },
  ],
  [
    "ZWE",
    {
      alpha2: "ZW",
      isEurope: false,
    },
  ],
  [
    "XXK",
    {
      alpha2: "XK",
      isEurope: false,
    },
  ],
]);
