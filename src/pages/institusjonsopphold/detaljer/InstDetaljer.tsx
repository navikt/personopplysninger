import { useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import INSTIkon from '@/assets/img/Institusjonsopphold.svg';
import WithInst from '../InstFetch';
import PageContainer from '@/components/pagecontainer/PageContainer';
import Kilde from '../../../components/kilde/Kilde';
import InstDetaljerView from './InstDetaljerView';

interface Routes {
    id: string;
}

const InstDetaljer = () => {
    const params = useParams<Readonly<Params<keyof Routes>>>();
    const { id } = params;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={'inst.tittel'}
            icon={INSTIkon}
            backTo={'/institusjonsopphold'}
            brodsmulesti={[{ title: 'inst.tittel', path: '/institusjonsopphold' }, { title: 'inst.detaljer' }]}
        >
            <WithInst>
                {({ data }) => {
                    const innslag = data.filter((d) => d.registreringstidspunkt === id).shift();

                    return innslag ? (
                        <InstDetaljerView innslag={innslag} />
                    ) : (
                        <div>
                            <FormattedMessage id="inst.ingendata" />
                        </div>
                    );
                }}
            </WithInst>
            <div className="inst__kilde">
                <Kilde kilde="inst.kilde" lenkeType="INGEN" />
            </div>
        </PageContainer>
    );
};

export default InstDetaljer;
