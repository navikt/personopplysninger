import { useIntl } from 'react-intl';

type ObjectType = Record<string, string | undefined | number>;

export const useIntlFormatter = () => {
    const { formatMessage } = useIntl();

    return {
        formatMessage: (id: string) => formatMessage({ id: id }),
        formatMessageWithValues: (id: string, values: ObjectType) => formatMessage({ id: id }, values),
    };
};
