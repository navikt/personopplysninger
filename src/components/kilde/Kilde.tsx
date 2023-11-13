import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, BodyLong, Detail, Button } from '@navikt/ds-react';

type IconType = string | React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;

type Props =
    | {
          kilde: string;
          lenkeType: 'INGEN';
      }
    | {
          kilde: string;
          lenke: string;
          lenkeTekst: string;
          lenkeType: 'EKSTERN';
          ikon?: IconType;
      }
    | {
          kilde: string;
          lenkeTekst: string;
          lenkeType?: 'KNAPP';
          onClick: () => void;
          ikon?: IconType;
      };

const Icon = ({ icon }: { icon: IconType }) => {
    const IconComponent = icon;
    return <IconComponent aria-hidden="true" className={'kilde__icon-aksel'} />;
};

const Knapp = (props: Props) => {
    switch (props.lenkeType) {
        case 'EKSTERN':
            return (
                <BodyLong>
                    <Link href={props.lenke}>
                        {props.ikon && (
                            <span className="kilde__icon">
                                <Icon icon={props.ikon} />
                            </span>
                        )}
                        <FormattedMessage id={props.lenkeTekst} />
                    </Link>
                </BodyLong>
            );
        case 'KNAPP':
            return (
                <Button
                    icon={props.ikon && <Icon icon={props.ikon} />}
                    onClick={props.onClick}
                    variant="tertiary"
                    className="kilde__knapp knapp-med-ikon"
                >
                    <FormattedMessage id={props.lenkeTekst} />
                </Button>
            );
        case 'INGEN':
        default:
            return null;
    }
};

const Kilde = (props: Props) => {
    return (
        <>
            <div className="kilde__tekst">
                {props.kilde && (
                    <Detail spacing>
                        <FormattedMessage
                            id={props.kilde}
                            values={{
                                span: (text) => <span style={{ textTransform: 'none' }}>{text}</span>,
                                br: (text) => (
                                    <>
                                        <br />
                                        {text}
                                    </>
                                ),
                            }}
                        />
                    </Detail>
                )}
            </div>
            <Knapp {...props} />
        </>
    );
};

export default Kilde;
