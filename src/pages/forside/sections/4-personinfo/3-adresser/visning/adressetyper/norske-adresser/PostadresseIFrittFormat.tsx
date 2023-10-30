import GateAdresse from '../../../komponenter/GateAdresse';
import Postnummer from '../../../komponenter/Postnummer';
import { PostadresseIFrittFormat as PostadresseIFrittFormatType } from 'types/adresser/adresse';

const PostadresseIFrittFormat = (props: PostadresseIFrittFormatType) => {
    const { adresselinje1, adresselinje2, adresselinje3 } = props;
    const { postnummer, poststed } = props;
    return (
        <>
            <GateAdresse adresse1={adresselinje1} adresse2={adresselinje2} adresse3={adresselinje3} />
            <Postnummer postnummer={postnummer} poststed={poststed} />
        </>
    );
};

export default PostadresseIFrittFormat;
