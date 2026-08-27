import { InformationIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading, Link, Modal } from "@navikt/ds-react";
import classNames from "classnames";
import { Fragment, useId, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Infotekst.module.css";

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
                type="button"
                className={styles.titleIButton}
                onClick={() => settErSynlig(!erSynlig)}
                onMouseEnter={() => settHover(true)}
                onMouseLeave={() => settHover(false)}
                aria-label={"Les mer om denne seksjonen."}
                aria-pressed={erSynlig}
            >
                <InformationIcon className={classNames(styles.titleIIcon, hover && styles.titleIIconHover)} aria-hidden="true" />
            </button>
            <Modal open={erSynlig} onClose={() => settErSynlig(false)} className={styles.modal} aria-labelledby={modalID}>
                <Modal.Header>
                    <Heading id={modalID} level="2" size="small">
                        <FormattedMessage id={overskriftID} />
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.ingress}>
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
                                    span: (text) => <span style={{ textTransform: "none" }}>{text}</span>,
                                    lenkeAaRegisteret: (text) => <Link href={"/arbeidsgiver/aa-registeret"}>{text}</Link>,
                                }}
                            />
                        </BodyLong>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Infotekst;
