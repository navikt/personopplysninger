import { InformationIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading, Link, Modal } from "@navikt/ds-react";
import { Fragment, useId, useState } from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Infotekst.module.css";

interface Props {
    overskriftID: string;
    beskrivelseID: string;
}

const Infotekst = ({ overskriftID, beskrivelseID }: Props) => {
    const [erSynlig, settErSynlig] = useState(false);
    const modalID = useId();

    return (
        <>
            <button
                type="button"
                className={styles.titleIButton}
                onClick={() => settErSynlig(!erSynlig)}
                aria-label={"Les mer om denne seksjonen."}
                aria-pressed={erSynlig}
            >
                <InformationIcon className={styles.titleIIcon} aria-hidden="true" />
            </button>
            <Modal open={erSynlig} onClose={() => settErSynlig(false)} className={styles.modal} aria-labelledby={modalID}>
                <Modal.Header>
                    <Heading id={modalID} level="2" size="small">
                        <FormattedMessage id={overskriftID} />
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.ingress}>
                        <BodyLong as="div">
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
};

export default Infotekst;
