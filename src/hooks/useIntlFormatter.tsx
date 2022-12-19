import React from "react";
import { useIntl } from "react-intl";

export const useIntlFormatter = () => {
  const { formatMessage } = useIntl();

  return {
    formatMessage: (id: string) => formatMessage({ id: id }),
    formatMessageWithValues: (id: string, values: {}) =>
      formatMessage({ id: id }, values),
  };
};
