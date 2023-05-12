import { Fragment, useState, useId } from 'react';
import infoIkon from 'assets/img/Informasjonstekst.svg';
import infoIkonFylt from 'assets/img/Informasjonstekst-fylt.svg';
import { FormattedMessage } from 'react-intl';
import { Link, BodyLong, Modal, Heading } from '@navikt/ds-react';

interface HjelpetekstProps {
    overskriftID: string;
    beskrivelseID: string;
}

function Infotekst(props: HjelpetekstProps) {
    const [hover, settHover] = useState(false);
    const [erSynlig, settErSynlig] = useState(false);
    const { overskriftID, beskrivelseID } = props;
    const modalID = useId();

    return (
        <>
            <button
                className="infotekst__title-i-button"
                onClick={() => settErSynlig(!erSynlig)}
                onMouseEnter={() => settHover(true)}
                onMouseLeave={() => settHover(false)}
                aria-label={'Les mer om denne seksjonen.'}
                aria-pressed={erSynlig}
            >
                <img src={hover ? infoIkonFylt : infoIkon} className="infotekst__title-i-icon" alt="" />
            </button>
            <Modal open={erSynlig} onClose={() => settErSynlig(false)} closeButton={true} className="infotekst__modal" aria-labelledby={modalID}>
                <Modal.Content>
                    <div style={{ padding: '2rem 2.5rem' }}>
                        <Heading id={modalID} level="2" size="small">
                            <FormattedMessage id={overskriftID} />
                        </Heading>
                        <div className="infotekst__ingress">
                            <BodyLong>
                                <FormattedMessage
                                    id={beskrivelseID}
                                    values={{
                                        p: (...chunks) => (
                                            <p>
                                                {chunks.map((chunk, i) => (
                                                    <Fragment key={i}>{chunk}</Fragment>
                                                ))}
                                            </p>
                                        ),
                                        br: (text) => (
                                            <>
                                                <br />
                                                {text}
                                            </>
                                        ),
                                        b: (text) => <b>{text}</b>,
                                        span: (text) => <span style={{ textTransform: 'none' }}>{text}</span>,
                                        lenkeAaRegisteret: (text) => <Link href={'/arbeidsgiver/aa-registeret'}>{text}</Link>,
                                    }}
                                />
                            </BodyLong>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    );
}

export default Infotekst;
