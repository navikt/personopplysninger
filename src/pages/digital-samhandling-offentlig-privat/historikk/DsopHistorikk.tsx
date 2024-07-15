import { useEffect } from 'react';
import PageContainer from '@/components/pagecontainer/PageContainer';
import DSOPIkon from '@/assets/img/DSOP.svg';
import WithDSOP from '../DsopFetch';
import DsopHistorikkView from './DsopHistorikkView';

const DsopHistorikk = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer tittelId={'dsop.tittel'} icon={DSOPIkon} backTo={'/#flere-opplysninger'} brodsmulesti={[{ title: 'dsop.tittel' }]}>
            <WithDSOP>{({ data }) => <DsopHistorikkView dsopInfo={data} />}</WithDSOP>
        </PageContainer>
    );
};
export default DsopHistorikk;
