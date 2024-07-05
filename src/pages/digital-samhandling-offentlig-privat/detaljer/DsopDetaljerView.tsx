import ListElement from '@/components/listelement/ListElement';
import { FormattedMessage } from 'react-intl';
import FileSaver from 'file-saver';
import { DsopInfo } from '@/types/dsop';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { Liste } from '@/components/listelement/Liste';

interface Props {
    id: string;
    dsopInfo: DsopInfo;
}

const DsopDetaljerView = (props: Props) => {
    const { id, dsopInfo } = props;
    const innslag = dsopInfo.filter((d) => d.uthentingsTidspunkt === id).shift();

    return innslag ? (
        (() => {
            const onClick = () => {
                const leverteData = JSON.parse(atob(innslag.leverteData));
                const fileContent = JSON.stringify(leverteData, null, 2);
                const fileBlob = new Blob([fileContent], {
                    type: 'application/json',
                });
                const fileName = 'utleverte-data.json';
                FileSaver.saveAs(fileBlob, fileName);
            };
            return (
                <div>
                    <div className="detaljer__tittel">
                        <Heading level="2" size="small">
                            {innslag.mottakernavn}
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="side.organisasjonsnummer" values={{ orgnr: innslag.mottaker }} />
                        </BodyShort>
                    </div>
                    <hr className="box__linje-bred" />
                    <div className="box">
                        <div className="box__content">
                            <Liste>
                                <ListElement
                                    titleId={'dsop.uthentingstidspunkt'}
                                    content={dayjs(innslag.uthentingsTidspunkt).format('DD.MM.YYYY hh:mm')}
                                />
                                <ListElement titleId={'dsop.personnummer'} content={innslag.person} />
                                <ListElement titleId={'dsop.tema'} content={innslag.tema} />
                            </Liste>
                        </div>
                        <div className="detaljer__container">
                            <Button variant="primary" onClick={onClick}>
                                <FormattedMessage id="dsop.lastned" />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        })()
    ) : (
        <div>
            <FormattedMessage id="dsop.ingendata" />
        </div>
    );
};

export default DsopDetaljerView;
