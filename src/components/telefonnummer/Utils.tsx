export const baseFormConfig = {
  landskode: {
    isRequired: "Landskode er påkrevd"
  },
  tlfnummer: {
    isRequired: "Du må skrive inn telefonnummer",
    isMinLength: {
      message: "Telefonnummeret må være 8 siffer",
      length: 8
    },
    isMaxLength: {
      message: "Telefonnummeret må være maksimalt 16 siffer",
      length: 16
    }
  }
};

export const typeFormConfig = {
  type: {
    isRequired: {
      message: "Type er påkrevd"
    },
    isWhitelisted: {
      message: "Type er påkrevd",
      whitelist: ["MOBIL", "ARBEID", "HJEM"]
    }
  }
};

export interface OutboundTlfnummer {
  type: string;
  landskode: string;
  nummer: string;
}
