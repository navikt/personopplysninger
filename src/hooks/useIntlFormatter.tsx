import React from "react";
import { useIntl } from "react-intl";

export const useIntlFormatter = () => {
  const { formatMessage } = useIntl();

  return { formatIntl: (id: string) => formatMessage({ id: id }) };
};
