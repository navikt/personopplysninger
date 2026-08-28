import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Alert, BodyShort, Button, Link as DsLink, Label } from "@navikt/ds-react";
import dayjs from "dayjs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CustomHelpText } from "@/components/customHelpText/CustomHelpText";
import Kilde from "@/components/kilde/Kilde";
import { useIntlFormatter } from "@/hooks/useIntlFormatter";
import type { InstInfo } from "@/types/inst";
import historikkStyles from "../../../styles/historikk.module.css";
import styles from "../Inst.module.css";

const InstHistorikkView = (props: { instInfo: InstInfo }) => {
    const [viewAmount, setViewAmount] = useState(20);
    const location = useLocation();
    const { formatMessage } = useIntlFormatter();
    const { instInfo } = props;

    let animateDelay = 0;
    let animateDelayKey = 0;
    let animateDelaySum = 0;

    return (
        <>
            <Alert variant="info">
                <FormattedMessage
                    id="inst.disclaimer"
                    values={{
                        br: () => <br />,
                        lenkeTilInnsyn: (text) => <DsLink href={"https://www.nav.no/kontaktoss"}>{text}</DsLink>,
                        lenkeTilInstMelding: (text) => <DsLink href={"https://www.nav.no/samarbeidspartner/opphold-institusjon"}>{text}</DsLink>,
                    }}
                />
            </Alert>
            <div className={styles.tabell}>
                {instInfo.length > 0 ? (
                    <>
                        <div className={`${historikkStyles.flexRad} ${styles.head}`}>
                            <div className={historikkStyles.flexKolonne}>
                                <Label as="p">
                                    <FormattedMessage id="inst.periode" />
                                </Label>
                            </div>
                            <div className={historikkStyles.flexKolonne}>
                                <Label as="p">
                                    <FormattedMessage id="inst.institusjon" />
                                </Label>
                            </div>
                        </div>
                        <TransitionGroup>
                            {instInfo
                                .sort((a, b) => (dayjs(a.startdato) > dayjs(b.startdato) ? -1 : 1))
                                .slice(0, viewAmount)
                                .map((innslag, i) => {
                                    if (animateDelayKey >= 20) {
                                        animateDelay = 0;
                                        animateDelayKey = 0;
                                        animateDelaySum = 0;
                                    }
                                    animateDelay = 50 + animateDelayKey * 15;
                                    animateDelaySum = +animateDelay;
                                    animateDelayKey++;

                                    const startdato = dayjs(innslag.startdato).format("DD.MM.YYYY");
                                    const faktiskSluttdato = innslag.faktiskSluttdato ? dayjs(innslag.faktiskSluttdato).format("DD.MM.YYYY") : "";

                                    return (
                                        <CSSTransition
                                            key={i}
                                            classNames={{ enter: styles.animateEnter, enterActive: styles.animateEnterActive }}
                                            style={{
                                                transitionDelay: `${animateDelay}ms`,
                                                fontWeight: i >= 20 && i >= viewAmount - 20 ? "bold" : "normal",
                                            }}
                                            timeout={100 + animateDelaySum}
                                        >
                                            <div className={historikkStyles.flexRad}>
                                                <div className={`${historikkStyles.flexKolonne} historikk__heading`}>
                                                    <BodyShort>{`${startdato} - ${faktiskSluttdato}`}</BodyShort>
                                                    {innslag.fiktivSluttdato && (
                                                        <CustomHelpText title={formatMessage("inst.fiktivSluttdato.tittel")}>
                                                            <FormattedMessage id={"inst.fiktivSluttdato"} />
                                                        </CustomHelpText>
                                                    )}
                                                </div>
                                                <div className={historikkStyles.flexKolonne}>
                                                    <Link to={`${location.pathname}/${innslag.registreringstidspunkt}`} className="lenke">
                                                        <BodyShort>{innslag.institusjonsnavn}</BodyShort>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    );
                                })}
                        </TransitionGroup>
                    </>
                ) : (
                    <div className={historikkStyles.ingenData}>
                        <Alert variant="info">
                            <FormattedMessage id="inst.ingendata" />
                        </Alert>
                    </div>
                )}
                {instInfo.length > 20 && instInfo.length >= viewAmount && (
                    <div className={styles.seFlere}>
                        <Button
                            variant={"tertiary"}
                            onClick={() => setViewAmount(viewAmount + 20)}
                            icon={<ChevronDownIcon aria-hidden={true} />}
                            iconPosition="right"
                        >
                            Se flere
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.kilde}>
                <Kilde kilde="inst.kilde" lenkeType="INGEN" />
            </div>
        </>
    );
};

export default InstHistorikkView;
