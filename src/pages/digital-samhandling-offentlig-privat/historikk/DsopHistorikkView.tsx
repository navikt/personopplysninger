import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Alert, Label, Link } from "@navikt/ds-react";
import classNames from "classnames";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import historikkStyles from "@/styles/historikk.module.css";
import type { DsopInfo } from "@/types/dsop";

interface Props {
    dsopInfo: DsopInfo;
    pathname?: string;
}

export const DsopHistorikkView = (props: Props) => {
    const { locale } = useIntl();
    const { dsopInfo, pathname = typeof window === "undefined" ? "" : window.location.pathname } = props;
    const detailsPath = pathname.replace(/\/$/, "");

    const initState: {
        [year: string]: {
            innslag: DsopInfo;
            ekspandert: boolean;
        };
    } = {};

    dsopInfo.forEach((innslag, i) => {
        const year = dayjs(innslag.uthentingsTidspunkt).year();

        if (!initState[year]) {
            initState[year] = {
                innslag: [innslag],
                ekspandert: !i,
            };
        } else {
            initState[year].innslag.push(innslag);
        }
    });

    const [data, setData] = useState(initState);

    return (
        <div className={classNames(historikkStyles.tabsInnhold, historikkStyles.flexTable)}>
            {Object.keys(data).length > 0 ? (
                <>
                    <div className={historikkStyles.info}>
                        <Alert variant="info">
                            <FormattedMessage
                                id={"lenker.dsop.info"}
                                values={{
                                    a: (text) => (
                                        <Link
                                            href={
                                                locale === "en"
                                                    ? "https://www.nav.no/personvernerklaering/en#who"
                                                    : "https://www.nav.no/personvernerklaering#hvem"
                                            }
                                            target="blank"
                                        >
                                            {text}
                                        </Link>
                                    ),
                                    br: (text) => (
                                        <>
                                            <br />
                                            {text}
                                        </>
                                    ),
                                }}
                            />
                        </Alert>
                    </div>
                    <div className={historikkStyles.flexRad}>
                        <div className={historikkStyles.flexKolonne}>
                            <Label as="p">
                                <FormattedMessage id="dsop.uthentingstidspunkt" />
                            </Label>
                        </div>
                        <div className={historikkStyles.flexKolonne}>
                            <Label as="p">
                                <FormattedMessage id="dsop.mottaker" />
                            </Label>
                        </div>
                    </div>
                    {Object.keys(data)
                        .reverse()
                        .map((year) => {
                            const value = data[year];

                            const onClick = () => {
                                setData({
                                    ...data,
                                    [year]: {
                                        ...data[year],
                                        ekspandert: !data[year].ekspandert,
                                    },
                                });
                            };

                            return (
                                <Fragment key={year}>
                                    <div className={historikkStyles.flexRad} key={year}>
                                        <button
                                            type="button"
                                            className={classNames(historikkStyles.flexKolonne, "af-liste__ekspander")}
                                            onClick={onClick}
                                        >
                                            {year} {value.ekspandert ? <ChevronUpIcon aria-hidden="true" /> : <ChevronDownIcon aria-hidden="true" />}
                                        </button>
                                        <div />
                                    </div>
                                    {value.ekspandert &&
                                        value.innslag.map((innslag, i) => (
                                            <div className={historikkStyles.flexRad} key={i}>
                                                <div className={historikkStyles.flexKolonne}>
                                                    {dayjs(innslag.uthentingsTidspunkt).format("DD.MM kl. hh:mm")}
                                                </div>
                                                <div className={historikkStyles.flexKolonne}>
                                                    <a href={`${detailsPath}/${encodeURIComponent(innslag.uthentingsTidspunkt)}`} className="lenke">
                                                        {innslag.mottakernavn}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                </Fragment>
                            );
                        })}
                </>
            ) : (
                <div className={historikkStyles.ingenData}>
                    <Alert variant="info">
                        <FormattedMessage
                            id="dsop.ingendata"
                            values={{
                                a: (text) => (
                                    <Link
                                        href={
                                            locale === "en"
                                                ? "https://www.nav.no/personvernerklaering/en#who"
                                                : "https://www.nav.no/personvernerklaering#hvem"
                                        }
                                        target="blank"
                                    >
                                        {text}
                                    </Link>
                                ),
                                br: (text) => (
                                    <>
                                        <br />
                                        {text}
                                    </>
                                ),
                            }}
                        />
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default DsopHistorikkView;
