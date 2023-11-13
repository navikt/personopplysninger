import { BodyShort, Loader } from '@navikt/ds-react';

type Props = {
    text?: string;
};

const Spinner = ({ text = 'Laster innhold...' }: Props) => (
    <div className="spinner-wrapper">
        <BodyShort>{text}</BodyShort>
        <Loader size="large" />
    </div>
);

export default Spinner;
