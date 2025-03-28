import { FormattedMessage } from 'react-intl';
import { BodyLong, GuidePanel, Heading, Link } from '@navikt/ds-react';
import veilederIkon from '@/assets/img/Veileder.svg';
import ErrorMessage from '@/components/errorMessage/ErrorMessage';
import Spinner from '../4-personinfo/PersonInfo';
import { formatName } from '@/utils/text';
import { useStore } from '@/store/Context';

const Header = () => {
    const [{ authInfo }] = useStore();

    switch (authInfo.status) {
        default:
        case 'LOADING': {
            return <Spinner />;
        }
        case 'RESULT': {
            const { name } = authInfo.data;
            const fornavn = name.split(' ')[0];
            const Veileder = <img src={veilederIkon} className="header__ikon" alt="Veileder" />;

            return (
                <div className="header">
                    <GuidePanel illustration={Veileder} poster={true}>
                        <div className="box__container header__content">
                            <Heading size={'medium'} level={'2'}>
                                {fornavn ? (
                                    <FormattedMessage id="header.hello.name" values={{ name: formatName(fornavn) }} />
                                ) : (
                                    <FormattedMessage id="header.hello" />
                                )}
                            </Heading>
                            <div className="header__seksjon">
                                <BodyLong>
                                    <FormattedMessage id="header.obs" />
                                </BodyLong>
                            </div>
                            <div className="header__seksjon">
                                <BodyLong>
                                    <FormattedMessage
                                        id="header.description"
                                        values={{
                                            a: (text) => (
                                                <Link href="/personvern" target="blank" rel="noopener noreferrer" className="header__link">
                                                    {text}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </div>
                        </div>
                    </GuidePanel>
                </div>
            );
        }
        case 'ERROR': {
            return <ErrorMessage error={authInfo.error} />;
        }
    }
};
export default Header;
