export const baseFormConfig = {
  landskode: {
    isRequired: "Landskode er påkrevd"
  },
  tlfnummer: {
    isRequired: "Du må skrive inn telefonnummer",
    isNumber: "Telefonnummer kan kun inneholde siffer",
    norwegianNumberIsValid: "Norske telefonnummer må ha 8 siffer",
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
