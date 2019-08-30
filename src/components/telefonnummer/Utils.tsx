export const formConfig = {
  landskode: {
    isRequired: "landskode er påkrevd"
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

export interface OutboundTlfnummer {
  type: string;
  landskode: string;
  nummer: string;
}
