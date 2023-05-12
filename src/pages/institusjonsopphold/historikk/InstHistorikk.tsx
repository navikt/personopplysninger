import { useEffect } from 'react';
import PageContainer from 'components/pagecontainer/PageContainer';
import INSTIkon from 'assets/img/Institusjonsopphold.svg';
import WithInst from '../InstFetch';
import InstHistorikkView from './InstHistorikkView';

const InstHistorikk = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer tittelId={'inst.tittel'} icon={INSTIkon} backTo={'/#flere-opplysninger'} brodsmulesti={[{ title: 'inst.tittel' }]}>
            <WithInst>{({ data }) => <InstHistorikkView instInfo={data} />}</WithInst>
        </PageContainer>
    );
};

export default InstHistorikk;
